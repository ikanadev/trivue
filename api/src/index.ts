import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger';

const app = new Elysia();

app.use(swagger());

app.get("/", () => "Hello Elysia");

app.get("/id/:id", ({ params }) => params.id, {
  params: t.Object({ id: t.Numeric() })
});

app.listen("3000");

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
