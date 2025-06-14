import Elysia, { t } from "elysia";
import { Routes } from "../../../../routes/routes";
import { IWalletGateway } from "../gateways/IWalletGateway";
import { WalletControllerRoutes, WalletDepositBody, WalletTransferBody, WalletWithdrawBody } from "./IWalletController";

export const WalletController: (gateway: IWalletGateway) => Partial<Elysia<Routes.WALLET_CONTROLLER>> = (gateway: IWalletGateway) => {

	const walletController = new Elysia({ prefix: Routes.WALLET_CONTROLLER })

		.get(
			WalletControllerRoutes.BALANCE,
			async ({ params }) => {
				const { userId } = params;
				return await gateway.getBalance(userId);
			}
		)

		.post(
			WalletControllerRoutes.DEPOSIT,
			async ({ body }) => {
				try {
					const { userId, amount } = body;
					await gateway.deposit(userId, amount);
					return { message: "Deposit successful" };
				} catch (error) {
					console.error("Error during deposit:", error);
					return { message: "Deposit failed" };
				}
			},
			{
				body: WalletDepositBody
			}
		)
		.post(
			"/withdraw/:userId",
			async ({ params, body }) => {
				const { userId } = params;
				const { amount } = body;
				return await gateway.withdraw(userId, amount);
			},
			{
				body: WalletWithdrawBody
			}
		)
		.post(
			"/transfer",
			async ({ body }) => {
				const { fromUserId, toUserId, amount } = body;
				return await gateway.transfer(fromUserId, toUserId, amount);
			},
			{
				body: WalletTransferBody
			}
		)
		.get("/history/:userId", async ({ params }) => {
			const { userId } = params;
			return await gateway.getTransactionHistory(userId);
		});

	return walletController;
}
