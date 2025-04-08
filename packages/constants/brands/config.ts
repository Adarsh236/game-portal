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

export const API_ENDPOINTS = {
  games: '/api/games',
};
