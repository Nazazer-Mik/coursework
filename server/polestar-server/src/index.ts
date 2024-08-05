import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { dbPoolOptions } from "./db/dbconfig";
import mysql, { FieldPacket } from "mysql2/promise";
import { insertNewUser, insertTransaction } from "./db/dbqueries";
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

export interface Model {
  model_code: string;
  model: string;
  year: string;
  engine_power_kw: string;
  battery_kwh: string;
  range_mi: string;
  top_speed_mi: string;
  driveline: string;
  zero_sixty: string;
  towing_capacity: string;
  features: string;
  price: string;
  availability: string;
  motor: string;
  torque: string;
}

export interface CarOrder {
  car_order_id: string;
  car_id_fk: string;
  customer_id_fk: string;
  time_of_purchase: string;
  delivery: string;
  final_price: string;
  payment_method: string;
  status: string;
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

type TrendingModel = {
  orders_quantity: string;
  model_code_fk: string;
};

app.get("/custom-vehicle/trending-now", async (c) => {
  const dbQuery = `
  SELECT COUNT(*) AS orders_quantity, c.model_code_fk FROM car c
  INNER JOIN car_order co ON c.car_id = co.car_id_fk
  GROUP BY c.model_code_fk
  HAVING orders_quantity > 10 LIMIT 1;
  `;

  const [model] = await dbConnection.query(dbQuery);

  return c.json((model as TrendingModel[])[0]);
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
  page?: string;
};

type RowsCount = Array<{ rowsCount: string }>;

app.get("/new-vehicle", async (c) => {
  const resultsPerPage = 12;
  const filters = (await c.req.query()) as NewCarFilters;
  const page = Number(filters.page);
  delete filters["page"];

  let dbQuery = `
  SELECT DISTINCT
    c.model_code_fk,
    cm.model,
    color,
    interior_color,
    cm.motor,
    cm.engine_power_kw,
    cm.zero_sixty,
    cm.range_mi,
    wheels,
    towing_hitch,
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

  let dbSubQuery = dbQuery; // For counting rows in total
  dbQuery += ` LIMIT ${resultsPerPage} OFFSET ${(page - 1) * resultsPerPage};`;
  dbSubQuery = `SELECT COUNT(*) AS rowsCount FROM (${dbSubQuery}) AS subquery;`;

  const [cars] = await dbConnection.query(dbQuery);
  const [rowsNumberRaw] = await dbConnection.query(dbSubQuery);
  const pages = (rowsNumberRaw as RowsCount)[0].rowsCount;
  const returnPacket = {
    pages: pages,
    cars: cars,
  };

  return c.json(returnPacket);
});

// --------------------

app.get("/new-vehicle/popular-cars", async (c) => {
  const dbQuery = `
  SELECT COUNT(*) AS total_orders, c.model_code_fk, c.color, c.wheels, cm.motor, c.interior_color, c.towing_hitch FROM car_order co
  INNER JOIN car c ON co.car_id_fk = c.car_id
  INNER JOIN car_model cm ON c.model_code_fk = cm.model_code
  WHERE c.preassembled = 1
  GROUP BY c.model_code_fk, c.color, c.wheels, c.interior_color, c.towing_hitch
  LIMIT 3;
  `;

  const [popularCars] = await dbConnection.query(dbQuery);

  return c.json(popularCars);
});

// --------------------

app.post("/new-vehicle/buy", async (c) => {
  try {
    const body = await c.req.json();
    const userSessionId = body.user_session_id;
    const carData = body.car;

    const insertCarOrderQuery = `
    INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status)
    VALUES (
      (
        SELECT car_id FROM car c
        LEFT JOIN car_order co ON co.car_id_fk = c.car_id
        WHERE c.model_code_fk = "${carData.model_code_fk}"
          AND c.color = "${carData.color}"
          AND c.interior_color = "${carData.interior_color}"
          AND c.wheels = "${carData.wheels}"
          AND c.towing_hitch = ${carData.towing_hitch}
          AND co.car_id_fk IS NULL
        LIMIT 1
      ),
      (
        SELECT ct.customer_id FROM customer ct
        INNER JOIN credentials cr ON ct.user_id_fk = cr.user_id
        WHERE cr.sessions_id = "${userSessionId}"
        LIMIT 1
      ),
      NOW(),
      TRUE,
      ${carData.price},
      "Visa Debit",
      "Awaiting confirmation"
    );`;

    await dbConnection.query(insertCarOrderQuery);
  } catch (e) {
    console.log(e);
    return c.json({
      status: "Error",
      message: (e as Error).toString(),
    });
  }

  return c.json({
    status: "OK",
    message: "",
  });
});

// --------------------

app.post("/new-vehicles/full-spec", async (c) => {
  const obj = await c.req.json();

  const dbQuery = `
  SELECT 
    c.model_code_fk,
    c.color,
    c.interior_color,
    c.wheels,
    c.towing_hitch,
    c.warranty_years,
    cm.model_code,
    cm.model,
    cm.year,
    cm.engine_power_kw,
    cm.battery_kwh,
    cm.range_mi,
    cm.top_speed_mi,
    cm.driveline,
    cm.zero_sixty,
    cm.towing_capacity,
    cm.features,
    cm.availability,
    cm.motor,
    cm.torque,
    (cm.price + modifications_price) AS price
  FROM
    car c
        INNER JOIN
    car_model cm ON c.model_code_fk = cm.model_code
  WHERE c.model_code_fk = "${obj.model_code_fk}" AND c.color = "${obj.color}" AND c.interior_color = "${obj.interior_color}" AND
  c.wheels = "${obj.wheels}" AND c.towing_hitch = ${obj.towing_hitch} LIMIT 1;
  `;

  const [fullCar] = await dbConnection.query(dbQuery);

  return c.json(fullCar);
});

// --------------------

app.post("/custom-vehicles/full-spec", async (c) => {
  const obj = await c.req.json();

  const dbQuery = `
  SELECT * FROM car_model WHERE model_code = "${obj.model_code}";
  `;

  const [fullModel] = await dbConnection.query(dbQuery);

  return c.json((fullModel as Model[])[0]);
});

// --------------------

app.get("/custom-vehicles/options", async (c) => {
  const obj = await c.req.query();

  const dbQuery = `
  SELECT * FROM customize_options WHERE model = "${obj.model}";
  `;

  const [options] = await dbConnection.query(dbQuery);

  return c.json(options);
});

// --------------------

app.post("/custom-vehicle/buy", async (c) => {
  const result = await insertTransaction(dbConnection, async () => {
    const obj = await c.req.json();
    const userSessionId: string = obj.user_session_id;
    const carData = obj.car;
    const modificationsPrice = carData.final_price - carData.price;
    const newVin = md5(String(Date.now())).slice(0, 17).toUpperCase(); // Need to be replaced with proper available_vin_and_numbers table in future
    const newNumber =
      `${md5(newVin).slice(0, 2)}24${md5(newVin).slice(3, 6)}`.toUpperCase(); // Need to be replaced with proper available_vin_and_numbers table in future

    const insertCarQuery = `INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
      VALUES("${carData.model_code}", "${carData.color}", "${carData.interior_color}", "${carData.wheels}", ${(carData.towing_hitch as string).toLowerCase() == "yes" ? 1 : 0},
      "${newVin}", "${newNumber}", ${carData.warranty_years}, ${modificationsPrice}, 0);`;

    await dbConnection.query(insertCarQuery);

    const carIdQuery = `
    SELECT LAST_INSERT_ID() AS car_id;
    `;

    const [carIdRaw] = await dbConnection.query(carIdQuery);
    const carId = (carIdRaw as { car_id: number }[])[0].car_id;

    const insertCarOrderQuery = `
    INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status)
    VALUES (
      ${carId},
      (
        SELECT ct.customer_id FROM customer ct
        INNER JOIN credentials cr ON ct.user_id_fk = cr.user_id
        WHERE cr.sessions_id = "${userSessionId}"
        LIMIT 1
      ),
      NOW(),
      TRUE,
      ${carData.final_price},
      "Visa Debit",
      "Awaiting confirmation"
    );`;

    await dbConnection.query(insertCarOrderQuery);

    const updateStockQuery = `
    UPDATE car_model SET availability = ${Number(carData.availability) - 1} WHERE model_code = "${carData.model_code}";
    `;

    await dbConnection.query(updateStockQuery);
  });

  if (result === "success") {
    return c.json({
      status: "OK",
      message: "",
    });
  } else {
    return c.json({
      status: "Error",
      message: (result as Error).toString(),
    });
  }
});

// --------------------

app.get("/admin/new-vehicles", async (c) => {
  const dbQuery = `
  SELECT 
    car_id,
    model_code_fk,
    color,
    interior_color,
    wheels,
    towing_hitch,
    vin_code,
    reg_number,
    warranty_years,
    modifications_price,
    (co.car_id_fk IS NOT NULL) AS sold,
    preassembled
  FROM
    car c
        LEFT JOIN
    car_order co ON co.car_id_fk = c.car_id;
  `;

  const [cars] = await dbConnection.query(dbQuery);

  return c.json(cars);
});

// --------------------

app.post("/admin/custom-vehicles", async (c) => {
  const body = await c.req.json();
  const obj = body.data;
  let dbQuery = "";

  try {
    if (body.method === "CREATE") {
      dbQuery = `INSERT INTO car_model 
    VALUES("${obj.model_code}", "${obj.model}", "${obj.year}", ${obj.engine_power_kw}, ${obj.battery_kwh}, ${obj.range_mi},
    ${obj.top_speed_mi}, "${obj.driveline}", "${obj.zero_sixty}", ${obj.towing_capacity}, "${obj.features}", ${obj.price},
    ${obj.availability}, "${obj.motor}", ${obj.torque});`;
    } else if (body.method === "DELETE") {
      dbQuery = `DELETE FROM car_model WHERE model_code = "${obj.model_code}";`;
    } else if (body.method === "UPDATE") {
      dbQuery = `UPDATE car_model SET ${obj.property} = ${obj.value} WHERE model_code = "${obj.model_code}";`;
    }

    await dbConnection.query(dbQuery);
  } catch (e) {
    console.log(e);
    return c.json({
      status: "Error",
      message: (e as Error).toString(),
    });
  }

  return c.json({
    status: "OK",
    message: "",
  });
});

// --------------------

app.get("/admin/new-vehicles/models", async (c) => {
  let models;
  try {
    models = await dbConnection.query("SELECT model_code FROM car_model;");
  } catch (e) {
    console.log(e);
    return c.json({
      status: "Error",
      message: (e as Error).toString(),
    });
  }

  return c.json({
    status: "OK",
    models: models,
  });
});

app.post("/admin/new-vehicles", async (c) => {
  const body = await c.req.json();
  const obj = body.data;
  let dbQuery = "";

  try {
    if (body.method === "CREATE") {
      dbQuery = `INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled) 
      VALUES("${obj.model_code_fk}", "${obj.color}", "${obj.interior_color}", "${obj.wheels}", ${(obj.towing_hitch as string).toLowerCase() == "yes" ? 1 : 0}, "${obj.vin_code}", 
      "${obj.reg_number}", ${obj.warranty_years}, ${obj.modifications_price}, 1);`;
    } else if (body.method === "DELETE") {
      dbQuery = `DELETE FROM car WHERE car_id = "${obj.car_id}";`;
    } else if (body.method === "UPDATE") {
      dbQuery = `UPDATE car SET model_code_fk = "${obj.model_code_fk}", color = "${obj.color}", interior_color = "${obj.interior_color}",
      wheels = "${obj.wheels}", towing_hitch = ${(obj.towing_hitch as string).toLowerCase() == "yes" ? 1 : 0}, vin_code = "${obj.vin_code}", reg_number = "${obj.reg_number}",
      warranty_years = ${obj.warranty_years}, modifications_price = ${obj.modifications_price} WHERE car_id = "${obj.car_id}";`;
    }

    await dbConnection.query(dbQuery);
  } catch (e) {
    console.log(e);
    return c.json({
      status: "Error",
      message: (e as Error).toString(),
    });
  }

  return c.json({
    status: "OK",
    message: "",
  });
});

// --------------------

app.get("/admin/car-orders", async (c) => {
  const status = c.req.query().status;

  const dbQuery = `SELECT * FROM car_order ${status == undefined ? "" : `WHERE status = "${status}"`};`;

  const [orders] = await dbConnection.query(dbQuery);

  return c.json(orders);
});

// --------------------

app.post("/admin/car-orders", async (c) => {
  try {
    const body = await c.req.json();
    const action = body.action as string;

    if (action.split(" ")[0] === "UPDATE") {
      const propertyToUpdate = action.split(" ")[1];
      const { orderId, property } = body.data;

      const dbQuery = `UPDATE car_order SET ${propertyToUpdate} = "${property}" WHERE car_order_id = ${orderId};`;

      await dbConnection.query(dbQuery);
    }
  } catch (e) {
    console.log(e);
    return c.json({
      status: "Error",
      message: (e as Error).toString(),
    });
  }

  return c.json({
    status: "OK",
    message: "",
  });
});

// --------------------

app.get("/admin/charger-orders", async (c) => {
  const status = c.req.query().status;

  const dbQuery = `SELECT charger_order_id, customer_id_fk, charger_id_fk, cm.model AS model, delivery, installation, final_price, status, serial_number FROM charger_order co
  INNER JOIN charger_model cm ON co.charger_id_fk = cm.charger_id
  ${status == undefined ? "" : `WHERE co.status = "${status}"`};`;

  const [orders] = await dbConnection.query(dbQuery);

  return c.json(orders);
});

// --------------------

app.post("/admin/charger-orders", async (c) => {
  try {
    const body = await c.req.json();
    const action = body.action as string;

    if (action.split(" ")[0] === "UPDATE") {
      const propertyToUpdate = action.split(" ")[1];
      const { orderId, property } = body.data;

      const dbQuery = `UPDATE charger_order SET ${propertyToUpdate} = "${property}" WHERE charger_order_id = ${orderId};`;

      await dbConnection.query(dbQuery);
    }
  } catch (e) {
    console.log(e);
    return c.json({
      status: "Error",
      message: (e as Error).toString(),
    });
  }

  return c.json({
    status: "OK",
    message: "",
  });
});

// -------------------- SERVER START --------------------

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
