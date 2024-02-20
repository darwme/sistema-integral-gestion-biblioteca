import dotenv from "dotenv";
dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);
const sslOptions = {
  rejectUnauthorized: true,
};

export const config = {
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  ssl: sslOptions,
};
