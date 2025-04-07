import type { NextApiRequest, NextApiResponse } from "next";
import { Game } from "@game-portal/types";

// Module-level cache
let cachedGames: Game[] | null = null;
let lastFetched = 0;
const CACHE_DURATION = 1000 * 60 * 2; // 2 minutes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[]>
) {
  const now = Date.now();

  // Use cached games if available and within the cache duration.
  if (!cachedGames || now - lastFetched > CACHE_DURATION) {
    try {
      // Dynamically import the huge JSON file from the constants package.
      const imported = await import("@game-portal/constants/src/games.json");
      cachedGames = imported.default as Game[];
      lastFetched = now;
    } catch (error) {
      console.error("Error importing games JSON", error);
      return res.status(500).json([]);
    }
  }

  // Return the full games array.
  res.status(200).json(cachedGames);
}
