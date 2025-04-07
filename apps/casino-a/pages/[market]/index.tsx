import { BRANDS, CASINO_CONTENT } from '@game-portal/constants/brands';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

interface WelcomeProps {
  content: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { market: 'en' } }, { params: { market: 'ca' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<WelcomeProps> = async ({
  params,
}) => {
  const market = params?.market as string;

  const content = (
    CASINO_CONTENT[BRANDS.CASINO_A][
      market as keyof (typeof CASINO_CONTENT)[typeof BRANDS.CASINO_A]
    ] as any
  ).home || { title: 'Welcome', description: 'Welcome to our casino!' };

  return {
    props: { market, content },
    revalidate: 60,
  };
};

const WelcomePage: React.FC<WelcomeProps> = ({ content }) => {
  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
      </Head>
      <main>
        <h1>{content.description}</h1>
      </main>
    </>
  );
};

export default WelcomePage;
