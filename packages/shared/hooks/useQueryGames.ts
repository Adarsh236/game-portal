import {
  API_ENDPOINTS,
  USE_QUERY_DB,
} from '@game-portal/constants/brands/config';
import { Game } from '@game-portal/types';
import { useQuery } from '@tanstack/react-query';
import { initDB } from '../helpers/idbHelper';

const fetchGames = async (): Promise<Game[]> => {
  console.time('@@ useQueryGames-Start/End');

  // Initialize DB instance.
  const db = await initDB(USE_QUERY_DB);

  // First, try to get games from the store.
  const readTx = db.transaction(USE_QUERY_DB.storeId, 'readonly');
  const localGames: Game[] = await readTx.store.getAll();

  // If games are found locally, return them immediately.
  if (localGames.length > 0) {
    console.timeEnd('@@ useQueryGames-Start/End');
    return localGames;
  }

  // Otherwise, fetch games from the API.
  const response = await fetch(API_ENDPOINTS.games);

  if (!response.ok) throw new Error('Error fetching games');

  console.time('@@ useQueryGames_parse');
  const games: Game[] = await response.json();
  console.timeEnd('@@ useQueryGames_parse');

  // Write fetched games to the store.
  const writeTx = db.transaction(USE_QUERY_DB.storeId, 'readwrite');
  await Promise.all(games.map((game) => writeTx.store.put(game)));
  await writeTx.done;

  console.timeEnd('@@ useQueryGames-Start/End');
  return games;
};

export const useQueryGames = () => {
  return useQuery<Game[], Error>({
    queryKey: [USE_QUERY_DB.storeId],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
  });
};
