import { FieldPacket, Pool } from "mysql2/promise";
import { userRegData } from "..";

export async function insertTransaction(
  dbConnector: Pool,
  insertDataPart: () => void
) {
  try {
    await dbConnector.query("START TRANSACTION;");

    await insertDataPart();

    await dbConnector.query("COMMIT;");

    return "success";
  } catch (error) {
    await dbConnector.query("ROLLBACK;");
    console.log("DB Error! " + error);
    return error;
  }
}

export async function insertNewUser(
  dbConnector: Pool,
  data: userRegData,
  session_id: string
) {
  return await insertTransaction(dbConnector, async () => {
    await dbConnector.query(
      `INSERT INTO credentials(email, password, sessions_id) VALUES ("${data.email}", "${data.password}", "${session_id}");`
    );

    const [user] = (await dbConnector.query(
      `SELECT user_id FROM credentials WHERE credentials.email = "${data.email}";`
    )) as [{ user_id: string }[], FieldPacket[]];

    const user_id = user[0].user_id;

    await dbConnector.query(`INSERT INTO customer(first_name, last_name, date_of_birth, home_address, user_id_fk, number) 
      VALUES ("${data.firstName}", "${data.lastName}", "${data.dob}", "${data.homeAddress}", ${user_id}, "${data.phoneNumber}");`);
  });
}
