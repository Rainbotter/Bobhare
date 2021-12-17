export const SETTINGS = {
  APPLICATION: {
    PORT: process.env.PORT || "3000",
    BACKEND_URL_PREFIX: "/api",
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    WEB_APP_PATH: process.env.WEB_APP_PATH || 'web',
  },
  DATABASE: {
    PATH: process.env.DATABASE_PATH || "./db.sqlite3",

    COLLECTIONS: {
      COLLECTED_DATA_COLLECTION: "collected_data",
      USERS_COLLECTION: "users"
    }
  }
};
