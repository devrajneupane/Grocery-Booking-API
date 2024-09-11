import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });
dotenv.config();

export const env = {
  port: process.env.PORT,
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: +process.env.ACCESS_TOKEN_EXPIRY_MS!,
    refreshTokenExpiryMS: +process.env.REFRESH_TOKEN_EXPIRY_MS!,
  },
};
