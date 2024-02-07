import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const connection = async () => {
  const dbUrl = new URL(process.env.DATABASE_URL);
  const sslOptions = {
    rejectUnauthorized: true,
  };

  const connectionOptions = {
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    ssl: sslOptions,
  };

  return await mysql.createConnection(connectionOptions);
};
