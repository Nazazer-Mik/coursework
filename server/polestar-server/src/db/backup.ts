import fs from "fs";
import { exec } from "child_process";
import { backupUser, dbPoolOptions } from "./dbconfig";
import mysqldump from "mysqldump";
import { Pool } from "mysql2/promise";

export default async function readDatabase(db: Pool) {
  const tables = [
    "car",
    "car_order",
    "car_model",
    "charger_model",
    "charger_order",
    "credentials",
    "customer",
    "admin_credentials",
    "customize_options",
    "logs",
    "service_request",
    "test_drive_booking",
  ];

  const tablesWithData = {};
  for (const i in tables) {
    const data = await db.query(`SELECT * FROM ${tables[i]};`);
    tablesWithData[tables[i]] = data[0];
  }

  return tablesWithData;
}

/*



await mysqldump({
    connection: {
      host: dbPoolOptions.host,
      user: backupUser.user as string,
      password: backupUser.password as string,
      database: dbPoolOptions.database as string,
    },
    dumpToFile: "./dump.sql",
  });






const backupFileName = `db-backup.sql`;
  const pathToFile = __dirname + "..\\..\\..\\";
  //fs.createWriteStream(pathToFile + backupFileName);
  const command = `mysqldump --host=${dbPoolOptions.host} --user=${backupUser.user} --password="${backupUser.password}" ${dbPoolOptions.database} > "${backupFileName}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup failed: ${error.message}`);
      throw error;
    }

    console.log(`Backup successful! File created at: ${backupFileName}`);
    return backupFileName;
  });


const backupFileName = `./${Date.now() / 1000}-db-backup.sql`;
  const writeStream = fs.createWriteStream(backupFileName);

  const dump = spawn("mysqldump", [
    `--host=${dbPoolOptions.host}`,
    `--user=${dbPoolOptions.user}`,
    `--password=${dbPoolOptions.password}`, 
    String(dbPoolOptions.database),
  ]);

  dump.stdout
    .pipe(writeStream)
    .on("finish", () => console.log("Completed!"))
    .on("error", (e) => console.log(e.message));

  return backupFileName;

  */
