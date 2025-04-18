export interface Game {
  id: number;
  name: string;
  slug: string;
  desktopGameId?: string;
  mobileGameId?: string;
  meta: {
    thumbnail: {
      src: string;
    };
  };
  licenses: Array<{ id: number; key: string; name: string }>;
  aspectRatio: string;
  hasJackpot: boolean;
  demoModeLoggedIn: boolean;
  demoModeLoggedOut: boolean;
  isLiveGame: boolean;
  provider: {
    logo: string;
    meta: { vendorId: string };
    name: string;
    aggregator: string;
    externalKey: string;
  };
  tags: Array<{ id: number; name: string; type: number }>;
  category: { id: number; name: string };
  positions: { [key: string]: number };
  restrictions: Array<{
    licenses: string[];
    conditions: any;
  }>;
  certificates: any[];
  seoPage: any;
  localisation: any;
}

export interface User extends UserLogin {
  market: 'en' | 'ca';
  firstName: string;
  lastName: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface DBData {
  name: string;
  version: number;
  storeId: string;
  keyPath: string;
}

export interface GridConfig {
  columnCount: number;
  columnWidth: number;
  rowCount: number;
  rowHeight: number;
  gridWidth: number;
  gridHeight: number;
}
