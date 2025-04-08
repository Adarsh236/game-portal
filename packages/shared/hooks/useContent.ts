import { BRANDS, CASINO_CONTENT } from '@game-portal/constants/brands';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useContent = (brandId: string) => {
  const defaultContent =
    CASINO_CONTENT[brandId] || CASINO_CONTENT[BRANDS.CASINO_A];
  const router = useRouter();
  const [market, setMarket] = useState('en');
  const [content, setContent] = useState(defaultContent?.en);

  useEffect(() => {
    // Ensure this only runs client-side
    if (typeof document !== 'undefined') {
      const { market: queryMarket } = router.query;
      // If the market parameter is provided and valid, update state.
      if (queryMarket === 'en' || queryMarket === 'ca') {
        setMarket(queryMarket);
        if (typeof defaultContent === 'object' && defaultContent[queryMarket]) {
          setContent(defaultContent[queryMarket]);
        }
      }
    }
  }, [router.query, defaultContent]);

  if (!content) {
    throw new Error(`Content not found for market: ${market}`);
  }

  return { market, content };
};
