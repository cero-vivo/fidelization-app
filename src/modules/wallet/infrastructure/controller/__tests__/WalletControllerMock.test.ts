import { IWalletGateway } from "../../gateways/IWalletGateway";
import { describe, expect, it, jest } from "bun:test";
import { WalletControllerRoutes } from "../IWalletController";

export const WalletTestRoutes = (gateway: typeof mockWalletGateway) => {

    return {
        post: async (route: WalletControllerRoutes, {params, body}: { body?: Object, params?: Object}): Promise<{message: string}> => {
            switch(route) {
                case WalletControllerRoutes.DEPOSIT:
                    return { message: "Deposit successful"};
                case WalletControllerRoutes.WITHDRAW:
                    return { message: "Withdrawal successful" };
                case WalletControllerRoutes.TRANSFER:
                    return { message: "Transfer successful" };
                default:
                    throw new Error("Route not implemented");
            }
        },
        get: async (route: WalletControllerRoutes, param: any): Promise<any> => {
            switch(route) {
                case WalletControllerRoutes.BALANCE:
                    return { balance: mockWalletGateway.balance };
                case WalletControllerRoutes.HISTORY:
                    return [{ date: new Date(), amount: 100, type: "deposit" }];
                default:
                    throw new Error("Route not implemented");
            }
        }
    }
}

export const mockWalletGateway: IWalletGateway & { userId: string, balance: number, depositAmount: number, withdrawAmount: number, transferAmount: number } = {
    userId: "user123",
    balance: 1000,
    depositAmount: 500,
    withdrawAmount: 300,
    transferAmount: 2300,
    getBalance: jest.fn(async (userId: string) => 1000),
    deposit: jest.fn(async (userId: string, amount: number) => {}),
    withdraw: jest.fn(async (userId: string, amount: number) => {}),
    transfer: jest.fn(async (fromUserId: string, toUserId: string, amount: number) => {}),
    getTransactionHistory: jest.fn(async (userId: string) => [
        { date: new Date(), amount: 100, type: "deposit" },
    ]),
};

describe("WalletControllerMock", () => {
    const controller = WalletTestRoutes(mockWalletGateway);

    it("GET: Balance by userId", async () => {
        const userId = mockWalletGateway.userId
        const mockBalance = mockWalletGateway.balance
        const response = await controller.get(WalletControllerRoutes.BALANCE, { params: { userId: userId } })
        expect(response).toBeDefined();
        expect(response).toHaveProperty("balance");
        expect(response.balance).toBe(mockBalance);
        expect(response).toEqual({ balance: mockBalance });
    });

    it("POST: Deposit", async () => {
        const response: any = await controller.post(WalletControllerRoutes.DEPOSIT, { body: { userId: mockWalletGateway.userId, amount: mockWalletGateway.depositAmount } });
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message");
        expect(response).toEqual({ message: "Deposit successful" });
    });

    it("POST: Withdraw", async () => {
        const response = await controller.post(WalletControllerRoutes.WITHDRAW, {
            params: { userId: mockWalletGateway.userId },
            body: { amount: mockWalletGateway.withdrawAmount },
        });
        expect(response).toBeDefined();
        expect(response).toEqual({ message: "Withdrawal successful" });
    });

    it("POST: Transfer", async () => {
        const response = await controller.post(WalletControllerRoutes.TRANSFER, {
            body: { fromUserId: mockWalletGateway.userId, toUserId: mockWalletGateway.userId, amount: mockWalletGateway.transferAmount },
        });

        expect(response).toBeDefined();
        expect(response).toEqual({ message: "Transfer successful" });
    });

    it("GET: History", async () => {
        const response: any = await controller.get(WalletControllerRoutes.HISTORY, { params: { userId: mockWalletGateway.userId } });
        expect(response).toEqual([{ date: expect.any(Date), amount: 100, type: "deposit" }]);
        expect(response).toBeDefined();
        expect(response[0]).toHaveProperty("date");
        expect(response[0]).toHaveProperty("amount");
        expect(response[0]).toHaveProperty("type");
        expect(response[0].type).toBe("deposit");
        expect(response[0].amount).toBe(100);
        expect(response[0].date).toBeDefined();
        expect(response[0].date).toBeInstanceOf(Date);
    });
});