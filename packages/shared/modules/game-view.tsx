import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Game } from '@game-portal/types';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { useQueryGames } from '../hooks/useQueryGames';
import { RootState } from '../redux/store';

export const GameView: React.FC = () => {
  const { data: games, isLoading, error } = useQueryGames();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const { slug } = router.query;

  const game = games?.find((g: Game) => g.slug === slug);

  if (isLoading) return <p>Loading game...</p>;
  if (error) return <p>Error loading game: {error.message}</p>;
  if (!game || !games?.length) return <p>No game available</p>;

  const thumbnailSrc = game.meta.thumbnail.src;

  return (
    <>
      <Head>
        <title>{game.name} - Play Now</title>
        <meta
          name="description"
          content={`Play ${game.name} for ${user.username ? 'real money' : 'free'}.`}
        />
      </Head>
      <main>
        <section>
          <Typography gutterBottom variant="h2" component="div">
            {game.name}
          </Typography>
          <CardMedia
            component="img"
            height="200px"
            image={thumbnailSrc}
            alt={game.name}
            sx={{ objectFit: 'fill', maxWidth: '500px' }}
            loading="lazy"
          />
          <div>
            {user.username ? (
              <button>Play for Real</button>
            ) : (
              <button>Play for Free</button>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
