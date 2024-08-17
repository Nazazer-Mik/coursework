import fs from "fs";
import { exec } from "child_process";
import { backupUser, dbPoolOptions } from "./dbconfig";
import mysqldump from "mysqldump";
import { Pool } from "mysql2/promise";

const tablesAddOrder = [
  "admin_credentials",
  "customize_options",
  "logs",
  "car_model",
  "car",
  "credentials",
  "customer",
  "test_drive_booking",
  "car_order",
  "service_request",
  "charger_model",
  "charger_order",
];

const tablesRemoveOrder = [
  "admin_credentials",
  "customize_options",
  "logs",
  "service_request",
  "car_order",
  "test_drive_booking",
  "car",
  "car_model",
  "charger_order",
  "charger_model",
  "customer",
  "credentials",
];

export async function readDatabase(db: Pool) {
  const tablesWithData = {};
  for (const i in tablesAddOrder) {
    const data = await db.query(`SELECT * FROM ${tablesAddOrder[i]};`);
    tablesWithData[tablesAddOrder[i]] = data[0];
  }

  return tablesWithData;
}

async function insertData(db: Pool, table: string, data: object[]) {
  const dateFields = [
    "timestamp",
    "date_of_birth",
    "booking_time",
    "requested_on",
    "time_of_purchase",
  ];

  for (const row of data) {
    const keysArr: Array<string | number> = [];
    let valuesStr = "";

    for (const [k, v] of Object.entries(row)) {
      keysArr.push(k);
      if (typeof v == "string") {
        if (dateFields.includes(k)) {
          valuesStr +=
            '"' +
            new Date(v).toISOString().slice(0, 19).replace("T", " ") +
            '"';
        } else {
          valuesStr += `"${v}"`;
        }
      } else {
        valuesStr += v;
      }

      valuesStr += ", ";
    }

    valuesStr = valuesStr.slice(0, valuesStr.length - 2);

    const insertQuery = `INSERT INTO ${table}(${keysArr.join(", ")}) VALUES(${valuesStr})`;

    await db.query(insertQuery);
  }
}

export async function restoreDatabase(db: Pool, data: object) {
  try {
    await db.query("START TRANSACTION;");

    for (const t of tablesRemoveOrder) {
      await db.query(`DELETE FROM ${t};`);
    }

    for (const [table, arr] of Object.entries(data)) {
      await insertData(db, table, arr);
    }

    await db.query("COMMIT;");
  } catch (e) {
    await db.query("ROLLBACK;");
    throw e;
  }
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
