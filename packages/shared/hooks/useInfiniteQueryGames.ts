import { useInfiniteQuery } from "@tanstack/react-query";
import {
  API_ENDPOINTS,
  PAGE_SIZE,
  USE_INFINITY_QUERY_DB,
} from "@game-portal/constants/brands";
import { Game } from "@game-portal/types";
import { initDB } from "../helpers/idbHelper";
import Games from "@game-portal/constants/src/games.json";

const fetchGames = async ({ pageParam = 0 }) => {
  console.time("@@ useInfiniteQueryGames0");
  // const imported = await import("@game-portal/constants/src/games.json");
  // const Games = imported.default as Game[];
  const db = await initDB(USE_INFINITY_QUERY_DB);
  const writeTx = db.transaction(USE_INFINITY_QUERY_DB.storeId, "readwrite");

  const store = writeTx.store;

  // Get all local games and keys concurrently.
  const [localGames, existingKeys] = await Promise.all([
    store.getAll() as Promise<Game[]>,
    store.getAllKeys() as Promise<Array<string | number>>,
  ]);

  // const store = writeTx.objectStore(USE_INFINITY_QUERY_DB.storeId);
  // const localGames: Game[] = await store.getAll();

  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  let pageGames: Game[] = [];

  // If local data exists and is sufficient for this page, use it.
  if (localGames.length >= end) {
    pageGames = localGames.slice(start, end);
  } else {
    // const response = await fetch(API_ENDPOINTS.games);

    // if (!response.ok) throw new Error("Error fetching games");

    // // Otherwise, use the static JSON data as the source.
    // pageGames = (await response.json() as Game[]).slice(start, end);

    // Otherwise, use the static JSON data as the source.
    pageGames = (Games as Game[]).slice(start, end);

    // Filter out games that are already in the DB.
    const gamesToWrite = pageGames.filter(
      (game) => !existingKeys.includes(game.id)
    );
    // Write missing games concurrently.
    if (gamesToWrite.length > 0) {
      await Promise.all(gamesToWrite.map((game) => store.put(game)));
    }
  }

  await writeTx.done;

  const nextPage = end < (Games as Game[]).length ? pageParam + 1 : undefined;
  console.timeEnd("@@ useInfiniteQueryGames0");
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
