import { Game } from '@game-portal/types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export interface GameCardProps {
  game: Game;
  isLoggedIn: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isLoggedIn,
}: GameCardProps) => {
  const router = useRouter();

  // Extract the current market from the URL query.
  const market = (router.query.market as string) || 'en';

  const onClick = () => {
    router.push(`/${market}/casino/${game.slug}`);
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: 320 },
        margin: 1,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea key={game.name} role="button" onClick={onClick}>
        <CardMedia
          component="img"
          height="180"
          image={game.meta.thumbnail.src}
          alt={game.name}
          sx={{ objectFit: 'cover' }}
          loading="lazy"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {game.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isLoggedIn ? 'Play for Real' : 'Play for Free'}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="primary">
              {isLoggedIn ? 'Start Game' : 'Demo Game'}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
