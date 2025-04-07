import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Game } from "@game-portal/types";
// import { cookies } from "next/headers";
// import { BRANDS } from "@game-portal/constants/feature-flags";
import { BRANDS } from "@game-portal/constants/src/feature-flags"; // Exports categories JSON
import myGames from "@game-portal/constants/src/my-games.json"; // Exports the game list
interface GameStageProps {
  game: Game;
  isLoggedIn: boolean;
}
import cookie from "cookie";

// export const getStaticPaths: GetStaticPaths = async () => {
//   // const games: Game[] = myGames;
//   // const dd = require("@game-portal/constants/my-games");
//   // console.log("@@ dd:", dd);
//   const games: Game[] = require("@game-portal/constants/src/my-games.json");
//   console.log("@@ games:", games);
//   const markets = ["en", "ca"];
//   const paths: any[] = [];
//   markets.forEach((market) => {
//     games.forEach((game: Game) => {
//       paths.push({ params: { market, slug: game.slug } });
//     });
//   });
//   return { paths, fallback: false };

//   // const paths = games.map((game: Game) => ({ params: { slug: game.slug } }));
//   // return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<GameStageProps> = async ({
//   params,
// }) => {
//   const games: Game[] = require("../../../gamesList.json");
//   const game = games.find((g: Game) => g.slug === params?.slug);
//   if (!game) {
//     return { notFound: true };
//   }
//   const isLoggedIn = false;
//   return { props: { game, isLoggedIn }, revalidate: 60 };
// };

// export const getStaticProps: GetServerSideProps<GameStageProps> = async (
//   context
// ) => {
//   const { market, slug } = context.params!;
//   const games: Game[] = require("../../../gamesList.json");
//   const game = games.find((g: Game) => g.slug === slug);
//   if (!game) {
//     return { notFound: true };
//   }

//   // Determine if the user is logged in by checking for the presence of the "userMarket" cookie.
//   // Note: In Next.js, if you're using middleware or a custom cookie parser, you may need to adjust this.
//   // Parse cookies from the header using the cookie package
//   // const cookieStore = await cookies();

//   // const isLoggedIn = cookieStore.get("userMarket") ? true : false;
//   const isLoggedIn = false;
//   // return { props: { game, isLoggedIn }, revalidate: 60 };
//   return { props: { game, isLoggedIn } };
// };

// const GameStage: React.FC<GameStageProps> = ({ game, isLoggedIn }) => {
//   return (
//     <>
//       <Head>
//         <title>{game.name} - Play Now</title>
//         <meta
//           name="description"
//           content={`Play ${game.name} for ${isLoggedIn ? "real money" : "free"}.`}
//         />
//       </Head>
//       <main>
//         <h1>{game.name}</h1>
//         <Image src={game.thumbnail} alt={game.name} width={600} height={400} />
//         <div>
//           {isLoggedIn ? (
//             <button>Play for Real</button>
//           ) : (
//             <button>Play for Free</button>
//           )}
//         </div>
//       </main>
//     </>
//   );
// };

// export default GameStage;

export const getServerSideProps: GetServerSideProps<GameStageProps> = async (
  context
) => {
  const { market, slug } = context.params!;
  const games: Game[] = require("@game-portal/constants/src/games.json");
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
          content={`Play ${game.name} for ${isLoggedIn ? "real money" : "free"}.`}
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
