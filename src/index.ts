import { Elysia } from "elysia";
import { registerController } from "./modules/auth/infrastructure/register.controller";

const app = new Elysia()
	.use(registerController)
	.get("/", () => "Hello Elysia").listen(3000);
