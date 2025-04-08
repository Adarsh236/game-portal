import { Content as CASINO_A_CONTENT } from '@game-portal/constants/brands/casino-A/content';
import { Content as CASINO_B_CONTENT } from '@game-portal/constants/brands/casino-b/content';

export const BRANDS = {
  CASINO_A: 'casino-a',
  CASINO_B: 'casino-b',
};

export type BrandType = typeof BRANDS;

export const FEATURE_FLAGS = {
  [BRANDS.CASINO_A]: {
    en: { isLiveCasinoEnabled: true },
    ca: { isCasinoEnabled: false },
  },
  [BRANDS.CASINO_B]: {
    en: { isLiveCasinoEnabled: false },
    ca: { isCasinoEnabled: true },
  },
};

/**
 * Allowed market codes.
 */
export const ALLOWED_MARKETS = ['en', 'ca'];

/**
 * Allowed second-level route segments.
 */
export const ALLOWED_PATHS = [
  '',
  'login',
  'casino',
  'my-profile',
  'live-casino',
];

export const CASINO_CONTENT = {
  [BRANDS.CASINO_A]: CASINO_A_CONTENT,
  [BRANDS.CASINO_B]: CASINO_B_CONTENT,
};
