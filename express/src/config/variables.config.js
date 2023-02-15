const config = {
  USER_PASSORD: "123",
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT || 3030,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG,
  CORS: process.env.CORS?.split(",") || "*",
  PSQL: {
    URL: process.env.PSQL_URL,
    PORT: process.env.PSQL_PORT,
    HOST: "db",
    USER: "sensei",
    DATABASE: "sensei",
    PASSWORD: "sensei",
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || "1h",
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME || "1d",
  },
};

export default config;
