import {
  API_ENDPOINTS,
  PAGE_SIZE,
  USE_INFINITY_QUERY_DB,
} from '@game-portal/constants/brands/config';
import { Game } from '@game-portal/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IDBPDatabase } from 'idb';
import { initDB } from '../helpers/idbHelper';

/**
 * This function pair is designed to efficiently serve a paginated list of game objects
 * with high performance and minimal latency. The strategy relies on local caching via
 * IndexedDB and a concurrent API fetch, ensuring that:
 *
 * 1. The local cache is used for immediate responses if it has enough data, while
 *    updating in the background if possible.
 * 2. A separate, fresh write transaction is used to update the local cache, avoiding
 *    transaction conflicts ("the transaction has finished" errors).
 * 3. The API call is launched concurrently with a short timeout, so that if the API
 *    is slow, we can quickly fall back to cached data.
 *
 * --- refreshLocalCache ---
 *
 * - Purpose: To refresh the complete local cache of games from the API in the background.
 * - Steps:
 *    a. Send a fetch request to the games API endpoint.
 *    b. Parse the response as JSON into a list of game objects.
 *    c. Open a new write transaction on the specified object store in IndexedDB.
 *    d. Write every game from the API concurrently into the local database.
 *    e. Await the transaction's completion to ensure all data is stored, while any
 *       errors in the background are logged.
 *
 * --- fetchGames ---
 *
 * - Purpose: To provide a paginated response of game data for display (e.g., infinite scrolling).
 * - Steps:
 *    a. Calculate the start and end indices based on the page number and PAGE_SIZE.
 *    b. Start an API request concurrently to fetch the full game list.
 *    c. Open a read-only IndexedDB transaction to read only the number of items needed.
 *    d. If local games up to the required index exist:
 *         - Use the local data to slice the requested page.
 *         - Use a short timeout for the API response; if it returns quickly, update the
 *           total count; otherwise, fall back to the local data count.
 *         - Trigger a background cache refresh without delaying the response.
 *    e. If local data is insufficient:
 *         - Wait for the API response to provide a complete list.
 *         - Slice the needed page from the API response and update IndexedDB for any missing items.
 *    f. Determine if more pages exist based on the total number of games and return the slice,
 *       along with the next page index if available.
 *
 * Performance Considerations:
 * - Data is read from IndexedDB only up to the necessary limit.
 * - API calls and local data reads occur concurrently, improving responsiveness.
 * - Write operations are performed in separate transactions to prevent conflicts.
 * - A background cache refresh keeps local data up-to-date without blocking user interactions.
 *
 * This modular approach makes the code not only efficient and high performing but also
 * easy to maintain and extend as application demands evolve.
 */
async function refreshLocalCache(db: IDBPDatabase<unknown>): Promise<void> {
  try {
    const response = await fetch(API_ENDPOINTS.games);
    if (!response.ok) throw new Error('Error refreshing local cache');
    const games: Game[] = await response.json();
    const writeTx = db.transaction(USE_INFINITY_QUERY_DB.storeId, 'readwrite');
    await Promise.all(games.map((game) => writeTx.store.put(game)));
    await writeTx.done;
    console.log('Background cache refresh completed.');
  } catch (error) {
    console.error('Background refresh error:', error);
  }
}

export const fetchGames = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<{ games: Game[]; nextPage?: number }> => {
  console.time('@@ useInfiniteQueryGames-Start/End');

  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // Start API request concurrently.
  const apiPromise = fetch(API_ENDPOINTS.games).then((response) => {
    if (!response.ok) throw new Error('Error fetching games from API');
    return response.json() as Promise<Game[]>;
  });

  // Open the IndexedDB and perform a read-only transaction to read only as many items as needed.
  const db = await initDB(USE_INFINITY_QUERY_DB);
  const readTx = db.transaction(USE_INFINITY_QUERY_DB.storeId, 'readonly');
  const store = readTx.store;
  const localGames = (await store.getAll(undefined, end)) as Game[];
  const existingKeys = (await store.getAllKeys(undefined, end)) as Array<
    string | number
  >;
  await readTx.done;

  let pageGames: Game[] = [];
  let totalGames = 0;

  // Use a short timeout for the API result (e.g., 5sec)
  const apiTimeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), 5000),
  );
  const apiResult = await Promise.race([apiPromise, apiTimeoutPromise]);
  console.log('@@ localGames.length', localGames.length, end);
  if (localGames.length >= end) {
    // Sufficient data is available locally.
    pageGames = localGames.slice(start, end);

    // If API returned quickly, update totalGames from it.
    if (apiResult) {
      totalGames = (apiResult as Game[]).length;
    } else {
      // Otherwise, use the size of local data as fallback.
      totalGames = localGames.length;
    }

    // Fire off a background refresh (non-blocking).
    apiPromise
      .then(() => refreshLocalCache(db))
      .catch((err) => console.error('Background refresh error:', err));
  } else {
    // Local data is insufficient; wait for full API response.
    const gamesFromAPI = await apiPromise;
    totalGames = gamesFromAPI.length;
    pageGames = gamesFromAPI.slice(start, end);
    // Write missing games from the current page to IndexedDB.
    const gamesToWrite = pageGames.filter(
      (game) => !existingKeys.includes(game.id),
    );
    if (gamesToWrite.length > 0) {
      const writeTx = db.transaction(
        USE_INFINITY_QUERY_DB.storeId,
        'readwrite',
      );
      await Promise.all(gamesToWrite.map((game) => writeTx.store.put(game)));
      await writeTx.done;
    }
  }

  const nextPage = end < totalGames ? pageParam + 1 : undefined;
  console.log('@@ totalGames', totalGames, end, pageParam);
  console.timeEnd('@@ useInfiniteQueryGames-Start/End');
  return { games: pageGames, nextPage };
};

export const useInfiniteQueryGames = () => {
  return useInfiniteQuery({
    queryKey: [USE_INFINITY_QUERY_DB.storeId],
    queryFn: fetchGames,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: undefined,
  });
};
