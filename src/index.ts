import { Elysia } from "elysia";
import { API_VERSION, apiPath, apiURL, PORT } from "./config";
import { swagger } from '@elysiajs/swagger'
import cookie from "@elysiajs/cookie";
import { registerController } from "./modules/auth/infrastructure/controllers/register/RegisterController";
import { walletController } from "./modules/wallet/infrastructure/controller/WalletController";
import { systemAuthController } from "./api/auth/infrastructure/SystemAuthController";
import { loginController } from "./modules/auth/infrastructure/controllers/login/LoginController";

const app = new Elysia({ prefix: apiPath })
	.use(swagger())
	.use(cookie())
	.use(systemAuthController)
	.use(registerController)
	.use(loginController)
	.use(walletController)
	.onStart(() => {console.table([`PORT: ${PORT}`, `Main Path: ${apiPath}`, `Base URL: ${apiURL}`, `Version: ${API_VERSION}`])})
	.listen(PORT)
	
