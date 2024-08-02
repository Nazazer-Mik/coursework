import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { dbPoolOptions } from "./db/dbconfig";
import mysql, { FieldPacket } from "mysql2/promise";
import { insertNewUser } from "./db/dbqueries";
import { md5 } from "js-md5";

export interface adminAuthCredentials {
  admin_id: number;
  username: string;
  password: string;
  admin_sessions_id: string;
}

export interface userAuthCredentials {
  user_id: number;
  email: string;
  password: string;
  sessions_id: string;
}

export interface userRegData {
  firstName: string;
  lastName: string;
  dob: string;
  homeAddress: string;
  phoneNumber: string;
  email: string;
  password: string;
}

// -------------------- DB Init -----------------

const dbConnection = mysql.createPool(dbPoolOptions);

// -------------------- HONO --------------------

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

// -------------------- REQUESTS --------------------

app.get("/", (c) => {
  return c.text("Welcome to Polestar server!");
});

app.post("/auth", async (c) => {
  const body = await c.req.json();

  const [account] = (await dbConnection.query(
    `SELECT * FROM credentials WHERE email = "${body.email}";`
  )) as [userAuthCredentials[], FieldPacket[]];

  const user = account[0];

  if (user === undefined)
    return c.json({
      status: "Wrong details",
      message: "No user with such email address",
    });

  if (user.password !== body.password)
    return c.json({
      status: "Wrong details",
      message: "Password is incorrect",
    });

  console.log(`User logged in: ${user.email}`);
  return c.json({
    status: "OK",
    session_id: user.sessions_id,
  });
});

// --------------------

app.post("/admin-auth", async (c) => {
  const body = await c.req.json();

  const [account] = (await dbConnection.query(
    `SELECT * FROM admin_credentials WHERE username = "${body.username}";`
  )) as [adminAuthCredentials[], FieldPacket[]];

  const user = account[0];

  if (user === undefined)
    return c.json({
      status: "Wrong details",
      message: "Wrong username. Please check and try again",
    });

  if (user.password !== body.password)
    return c.json({
      status: "Wrong details",
      message: "Password is incorrect",
    });

  console.log(`Admin logged in with username: ${user.username}`);
  return c.json({
    status: "OK",
    session_id: user.admin_sessions_id,
  });
});

// --------------------

app.post("/register", async (c) => {
  const body: userRegData = await c.req.json();

  const [account] = (await dbConnection.query(
    `SELECT * FROM credentials WHERE email = "${body.email}";`
  )) as [userAuthCredentials[], FieldPacket[]];

  if (account.length > 0)
    return c.json({
      status: "Creating error",
      message: "User with such email address already exists",
    });

  const session_id = md5(body.email);

  const transactionResult = await insertNewUser(dbConnection, body, session_id);

  if (transactionResult !== "success") {
    return c.json({
      status: "DB Error",
      message: "Internal server error occured",
    });
  }

  console.log("New user created: " + body.email);

  return c.json({
    status: "OK",
    session_id: session_id,
  });
});

// --------------------

type ModelFilters = {
  model: string;
  driveline: string;
  motor: string;
};

app.get("/custom-vehicle", async (c) => {
  const filters = (await c.req.query()) as ModelFilters;
  let dbQuery = `SELECT * FROM car_model`;
  const sqlFilters: string[] = [];
  const keywords = [" WHERE ", " AND ", " AND "];

  for (const [k, v] of Object.entries(filters)) {
    if (v !== "any") {
      sqlFilters.push(`${k} = "${v}"`);
    }
  }

  for (let i = 0; i < sqlFilters.length; i++) {
    dbQuery += keywords[i] + sqlFilters[i];
  }

  const [models] = await dbConnection.query(dbQuery + ";");

  return c.json(models);
});

// --------------------

type NewCarFilters = {
  model: string;
  color: string;
  wheels: string;
  minRange: string;
  minPrice: string;
  maxPrice: string;
};

app.get("/new-vehicle", async (c) => {
  const filters = (await c.req.query()) as NewCarFilters;
  let dbQuery = `
  SELECT DISTINCT
    cm.model,
    color,
    interior_color,
    cm.motor,
    cm.engine_power_kw,
    cm.zero_sixty,
    cm.range_mi,
    wheels,
    (cm.price + modifications_price) AS price
FROM
    car c
        INNER JOIN
    car_model cm ON c.model_code_fk = cm.model_code
        LEFT JOIN
    car_order co ON co.car_id_fk = c.car_id
WHERE
    co.car_id_fk IS NULL`;

  for (const [k, v] of Object.entries(filters)) {
    if (v === "any" || v == "" || v == "0") continue;

    if (k === "minRange") {
      dbQuery += ` AND cm.range_mi >= ${v}`;
    } else if (k === "minPrice") {
      dbQuery += ` AND (cm.price + c.modifications_price) >= ${v}`;
    } else if (k === "maxPrice") {
      dbQuery += ` AND (cm.price + c.modifications_price) <= ${v}`;
    } else {
      dbQuery += ` AND ${k} = "${v}"`;
    }
  }

  const [cars] = await dbConnection.query(dbQuery + ";");

  return c.json(cars);
});

// -------------------- SERVER START --------------------

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
