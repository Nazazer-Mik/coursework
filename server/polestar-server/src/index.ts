import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

app.get("/", (c) => {
  return c.text("This is Polestar server!");
});

app.post("/auth", async (c) => {
  const body = await c.req.json();
  console.log(body);
  return c.text("OK");
});

app.post("/register", async (c) => {
  const body = await c.req.json();
  console.log(body);
  return c.text("OK");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
