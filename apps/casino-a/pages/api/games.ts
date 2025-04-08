import { Game } from '@game-portal/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[]>,
) {
  try {
    // Dynamically import the huge JSON file from the constants package.
    const games = (await import('@game-portal/constants/games.json'))
      .default as Game[];

    // Return the full games array.
    res.status(200).json(games);
  } catch (error) {
    console.error('Error importing games JSON', error);
    return res.status(500).json([]);
  }
}
