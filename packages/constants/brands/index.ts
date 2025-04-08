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
    ca: { isCasinoEnabled: true },
  },
  [BRANDS.CASINO_B]: {
    en: { isLiveCasinoEnabled: true },
    ca: { isCasinoEnabled: true },
  },
};

export const API_ENDPOINTS = {
  games: '/api/games',
};

export const MARKETS = ['en', 'ca'] as const;

export const CASINO_CONTENT = {
  [BRANDS.CASINO_A]: CASINO_A_CONTENT,
  [BRANDS.CASINO_B]: CASINO_B_CONTENT,
};

export const USE_QUERY_DB = {
  name: 'casino-games',
  version: 1,
  storeId: 'casino-games',
  keyPath: 'id',
};

export const USE_INFINITY_QUERY_DB = {
  name: 'live-casino-games',
  version: 1,
  storeId: 'live-casino-games',
  keyPath: 'id',
};

export const IMAGES_PATTERN = [
  {
    protocol: 'https',
    hostname: 'casinodays2.imgix.net',
    port: '',
    pathname: '/games/**',
    search: '',
  },
];

export const PAGE_SIZE = 20; // Number of games per page

export const WEB_SOCKET_CONFIG = {
  url: 'wss://ws.postman-echo.com', // Replace with your WebSocket URL
  protocols: ['protocolOne', 'protocolTwo'], // Optional protocols
  options: {
    reconnect: true, // Automatically reconnect on close
    maxReconnectAttempts: 5, // Maximum number of reconnection attempts
    reconnectInterval: 2000, // Reconnection interval in milliseconds
  },
};
