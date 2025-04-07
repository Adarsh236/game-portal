import { Game } from '@game-portal/types';
import cookie from 'cookie';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
interface GameStageProps {
  game: Game;
  isLoggedIn: boolean;
}

export const getServerSideProps: GetServerSideProps<GameStageProps> = async (
  context,
) => {
  const { market, slug } = context.params!;
  const games: Game[] = (await import(
    '@game-portal/constants/games.json'
  )) as Game[];
  const game = games.find((g: Game) => g.slug === slug);
  if (!game) {
    return { notFound: true };
  }
  const cookies = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)
    : {};
  const isLoggedIn = !!cookies.userMarket;
  return { props: { game, isLoggedIn } };
};

const GameStage: React.FC<GameStageProps> = ({ game, isLoggedIn }) => {
  // If the game thumbnail src doesn't start with http, prefix with default image base URL.
  // const thumbnailSrc = game.meta.thumbnail.src.startsWith('http')
  //   ? game.meta.thumbnail.src
  //   : `${DEFAULT_IMAGE_BASE_URL}/${game.meta.thumbnail.src}`;
  const thumbnailSrc = game.meta.thumbnail.src;

  return (
    <>
      <Head>
        <title>{game.name} - Play Now</title>
        <meta
          name="description"
          content={`Play ${game.name} for ${isLoggedIn ? 'real money' : 'free'}.`}
        />
      </Head>
      <main>
        <h1>{game.name}</h1>
        <Image src={thumbnailSrc} alt={game.name} width={600} height={400} />
        <div>
          {isLoggedIn ? (
            <button>Play for Real</button>
          ) : (
            <button>Play for Free</button>
          )}
        </div>
      </main>
    </>
  );
};

export default GameStage;
