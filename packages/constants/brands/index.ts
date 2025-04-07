import { Content as CASINO_B_CONTENT } from "@game-portal/constants/brands/casino-b/content";

export const BRANDS = {
  CASINO_A: "casino-a",
  CASINO_B: "casino-b",
};

export type BrandType = typeof BRANDS;

export const MENU_CONFIG = {
  "casino-a": { position: "left", theme: "dark" },
  "casino-b": { position: "top", theme: "light" },
};

export const API_ENDPOINTS = {
  games: "/api/games",
};

export const MARKETS = ["en", "ca"] as const;

export const CASINO_CONTENT = {
  [BRANDS.CASINO_A]: CASINO_B_CONTENT,
  [BRANDS.CASINO_B]: CASINO_B_CONTENT,
};

export const USE_QUERY_DB = {
  name: "casino-games",
  version: 1,
  storeId: "casino-games",
  keyPath: "id",
};

export const USE_INFINITY_QUERY_DB = {
  name: "live-casino-games",
  version: 1,
  storeId: "live-casino-games",
  keyPath: "id",
};

export const IMAGES_PATTERN = [
  {
    protocol: "https",
    hostname: "casinodays2.imgix.net",
    port: "",
    pathname: "/games/**",
    search: "",
  },
];

export const PAGE_SIZE = 20; // Number of games per page
