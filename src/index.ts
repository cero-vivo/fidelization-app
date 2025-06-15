import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { registerController } from "./modules/auth/infrastructure/register.controller";
import { walletController } from "./modules/wallet/infrastructure/controller/WalletController";
import { apiPath, PORT } from "./config";
import { systemAuthController } from "./ApiGateway/auth/infrastructure/SystemAuthController";

const app = new Elysia({ prefix: apiPath })
	.use(swagger())
	.use(systemAuthController)
	.use(registerController)
	.use(walletController)
	.listen(PORT);
