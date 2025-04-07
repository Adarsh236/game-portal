import { DBData } from "@game-portal/types";
import { IDBPDatabase, openDB } from "idb";

export const initDB = async ({
  name,
  version,
  storeId,
  keyPath,
}: DBData): Promise<IDBPDatabase> => {
  return openDB(name, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeId)) {
        db.createObjectStore(storeId, { keyPath });
      }
    },
  });
};
