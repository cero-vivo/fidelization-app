import { Elysia } from "elysia";
import { registerController } from "./modules/auth/infrastructure/register.controller";
import { WalletGateway } from "./modules/wallet/infrastructure/gateways/WalletGateway";
import { walletController } from "./modules/wallet/infrastructure/controller/WalletController";
import { apiURL } from "./config";

const app = new Elysia()
	.use(registerController)
	.use(walletController)
	.get("/", () => "Hello Elysia")
	.listen(3000);
