import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { registerController } from "./modules/auth/infrastructure/register.controller";
import { walletController } from "./modules/wallet/infrastructure/controller/WalletController";
import { apiPath, PORT } from "./config";
import { systemAuthController } from "./api/auth/infrastructure/SystemAuthController";
import cookie from "@elysiajs/cookie";

const app = new Elysia({ prefix: apiPath })
	.use(swagger())
	.use(cookie())
	.use(systemAuthController)
	.use(registerController)
	.use(walletController)
	.listen(PORT);
