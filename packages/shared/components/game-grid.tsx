import React, { memo } from 'react';

import { Game } from '@game-portal/types';
import dynamic from 'next/dynamic';
import type { GameCardProps } from './game-card';

const GameCard = memo(
  dynamic<GameCardProps>(
    () => import('./game-card.js').then((mod) => mod.GameCard),
    {
      ssr: false,
      loading: () => <div style={{ padding: '1rem' }}>Loading game...</div>,
    },
  ),
);

interface GameGridProps {
  games: Game[];
  isLoggedIn: boolean;
  cellConfig: any;
}

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  isLoggedIn,
  cellConfig,
}) => {
  const { columnCount, rowIndex, columnIndex, style } = cellConfig;

  const index = rowIndex * columnCount + columnIndex;
  if (index >= games.length) return null;
  const game = games[index] as Game; // Type assertion

  if (!game) return <p>No games available</p>;

  return (
    <div style={style} key={game.id}>
      <GameCard game={game} isLoggedIn={isLoggedIn} />
    </div>
  );
};
