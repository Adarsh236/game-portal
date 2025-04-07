import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { FixedSizeGrid as Grid } from "react-window";

import { RootState } from "../redux/store";
import { useWebSocket } from "../hooks/useWebSocket";
import { useQueryGames } from "../hooks/useQueryGames";
import { GameGrid } from "../components/game-grid";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { queryGridConfig } from "../helpers/grid-config";

export const CasinoLobby: React.FC = () => {
  const { data: games, isLoading, error } = useQueryGames();
  // Get window dimensions for responsiveness.
  const { width, height } = useWindowDimensions();
  const user = useSelector((state: RootState) => state.user);

  useWebSocket();

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
  } = queryGridConfig(width, height, games.length);

  return (
    <>
      <Head>
        <title>Casino Lobby</title>
        <meta
          name="description"
          content="Browse and select your favorite casino games."
        />
      </Head>
      <main>
        <h1>Casino Lobby </h1>
        <p>Note: In this Page we are using useQuery from React Query</p>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Grid
            columnCount={columnCount}
            columnWidth={columnWidth}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={gridWidth}
            height={gridHeight}
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
        </div>
      </main>
    </>
  );
};
