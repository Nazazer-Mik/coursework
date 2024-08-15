import { PoolOptions } from "mysql2";

export const dbPoolOptions: PoolOptions = {
  host: "127.0.0.1",
  port: 3310,
  user: "localClient",
  password: "z7zH<8'1%QpCuPPnPPXe",
  database: "polestar_website",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z",
};

export const backupUser = {
  user: "back",
  password: "wetmonkey22875!",
};
