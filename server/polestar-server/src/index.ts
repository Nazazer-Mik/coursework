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

app.get("/custom-vehicle", async (c) => {
  const [models] = await dbConnection.query(`SELECT * FROM car_model;`);

  return c.json(models);
});

// -------------------- SERVER START --------------------

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
