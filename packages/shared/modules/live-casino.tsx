import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';

import { RootState } from '../redux/store';

import { GameGrid } from '../components/game-grid';
import { infinityGridConfig } from '../helpers/grid-config';
import { useInfiniteQueryGames } from '../hooks/useInfiniteQueryGames';
import { useWebSocket } from '../hooks/useWebSocket';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

export const LiveCasinoLobby: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQueryGames();
  // Get window dimensions for responsiveness.
  const { width } = useWindowDimensions();
  const user = useSelector((state: RootState) => state.user);

  useWebSocket();

  // Flatten the pages into one array of games
  const games = data?.pages.flatMap((page) => page.games) || [];

  // Set up an intersection observer to auto-load more items
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(loadMoreElement);

    return () => {
      observer.unobserve(loadMoreElement);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading games...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;
  if (!games || games.length === 0) return <p>No games available</p>;

  const {
    columnCount,
    columnWidth,
    rowCount,
    rowHeight,
    gridWidth,
    gridHeight,
  } = infinityGridConfig(width, games.length);

  return (
    <>
      <Head>
        <title>Live Casino Lobby</title>
        <meta
          name="description"
          content="Browse and select your favorite casino games."
        />
      </Head>
      <main>
        <h1>Casino Lobby </h1>
        <p>
          Note: In this Page we are using useInfinityQuery with scrolling
          feature from React Query
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={gridHeight}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={gridWidth}
            style={{ overflow: 'visible' }}
          >
            {({ columnIndex, rowIndex, style }) => (
              <GameGrid
                games={games}
                isLoggedIn={!!user.username}
                cellConfig={{
                  columnCount,
                  rowIndex,
                  columnIndex,
                  style,
                }}
              />
            )}
          </Grid>

          {isFetchingNextPage && (
            <p
              style={{
                textAlign: 'center',
                width: '100%',
                paddingBottom: '1rem',
              }}
            >
              Loading more...
            </p>
          )}
          {/* Invisible trigger element to auto-load more games */}
          <div
            ref={loadMoreRef}
            style={{ height: '150px', width: '100%', display: 'block' }}
          />
        </div>
      </main>
    </>
  );
};
