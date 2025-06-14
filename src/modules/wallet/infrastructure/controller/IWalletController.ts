import { Static, t } from "elysia";
import { apiURL } from "../../../../config";
import { Routes } from "../../../../routes/routes";

export enum WalletControllerRoutes {
    BALANCE = `/balance`,
    DEPOSIT = "/deposit",
    WITHDRAW = "/withdraw/:userId",
    TRANSFER = "/transfer",
    HISTORY = "/history/:userId"
}
export const WalletDepositBody = t.Object({
    amount: t.Number({ minimum: 0, description: "Amount to deposit" }),
    userId: t.String({ description: "ID of the user making the deposit" }),
})

export const WalletWithdrawBody = t.Object({
	amount: t.Number(),
});

export const WalletTransferBody = t.Object({
	fromUserId: t.String(),
	toUserId: t.String(),
	amount: t.Number(),
});

export type WalletDepositBodyType = Static<typeof WalletDepositBody>;
export type WalletWithdrawBodyType = Static<typeof WalletWithdrawBody>;
export type WalletTransferBodyType = Static<typeof WalletTransferBody>;