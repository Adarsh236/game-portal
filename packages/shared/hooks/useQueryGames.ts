import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, USE_QUERY_DB } from "@game-portal/constants/brands";
import { Game } from "@game-portal/types";
import { initDB } from "../helpers/idbHelper";

const fetchGames2 = async (): Promise<Game[]> => {
  console.time("@@ useQueryGames0");
  console.time("@@ useQueryGames1");
  const response = await fetch(API_ENDPOINTS.games);
  console.timeEnd("@@ useQueryGames1");

  if (!response.ok) throw new Error("Error fetching games");

  console.time("@@ useQueryGames2");
  const games: Game[] = await response.json();
  console.timeEnd("@@ useQueryGames2");

  console.time("@@ useQueryGames3");

  const db = await initDB(USE_QUERY_DB);
  const writeTx = db.transaction(USE_QUERY_DB.storeId, "readwrite");

  const existingKeys = await writeTx.store.getAllKeys();
  // If there are missing games in DB, write only the missing ones concurrently
  if (existingKeys.length < games.length) {
    const gamesToWrite = games.filter(
      (game) => !existingKeys.includes(game.id)
    );
    await Promise.all(gamesToWrite.map((game) => writeTx.store.put(game)));
  }
  console.timeEnd("@@ useQueryGames3");

  console.time("@@ useQueryGames4");
  await writeTx.done;
  console.timeEnd("@@ useQueryGames4");
  console.timeEnd("@@ useQueryGames0");
  return games;
};

const fetchGames = async (): Promise<Game[]> => {
  console.time("@@ useQueryGames0");

  // Initialize DB instance.
  const db = await initDB(USE_QUERY_DB);

  // First, try to get games from the store.
  console.time("@@ useQueryGames_store");
  const readTx = db.transaction(USE_QUERY_DB.storeId, "readonly");
  const localGames: Game[] = await readTx.store.getAll();
  console.timeEnd("@@ useQueryGames_store");

  // If games are found locally, return them immediately.
  if (localGames.length > 0) {
    console.timeEnd("@@ useQueryGames0");
    return localGames;
  }

  // Otherwise, fetch games from the API.
  console.time("@@ useQueryGames_fetch");
  const response = await fetch(API_ENDPOINTS.games);
  console.timeEnd("@@ useQueryGames_fetch");

  if (!response.ok) throw new Error("Error fetching games");

  console.time("@@ useQueryGames_parse");
  const games: Game[] = await response.json();
  console.timeEnd("@@ useQueryGames_parse");

  // Write fetched games to the store.
  console.time("@@ useQueryGames_write");
  const writeTx = db.transaction(USE_QUERY_DB.storeId, "readwrite");
  await Promise.all(games.map((game) => writeTx.store.put(game)));
  await writeTx.done;
  console.timeEnd("@@ useQueryGames_write");

  console.timeEnd("@@ useQueryGames0");
  return games;
};

export const useQueryGames = () => {
  return useQuery<Game[], Error>({
    queryKey: [USE_QUERY_DB.storeId],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
  });
};
