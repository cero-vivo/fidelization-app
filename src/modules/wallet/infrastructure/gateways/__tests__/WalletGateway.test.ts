// File: src/modules/wallet/infrastructure/gateways/__tests__/WalletGateway.test.ts
import { describe, expect, it, jest, mock } from "bun:test";
import { IWalletGateway } from "../IWalletGateway";

const mockWalletGateway: IWalletGateway  & { userId: string, balance: number} = {
    userId: "user123",
    balance: 1000,
    getBalance: jest.fn(async (userId: string) => 1000),
    deposit: jest.fn(async (userId: string, amount: number) => {}),
    withdraw: jest.fn(async (userId: string, amount: number) => {}),
    transfer: jest.fn(async (fromUserId: string, toUserId: string, amount: number) => {}),
    getTransactionHistory: jest.fn(async (userId: string) => [
        { date: new Date(), amount: 100, type: "deposit" },
    ]),
};

describe("WalletGateway", () => {
    it("should fetch the balance for a user", async () => {
        const balance = await mockWalletGateway.getBalance(mockWalletGateway.userId);
        expect(balance).toBe(mockWalletGateway.balance);
        expect(mockWalletGateway.getBalance).toHaveBeenCalledWith(mockWalletGateway.userId);
    });

    it("should deposit an amount for a user", async () => {
        await mockWalletGateway.deposit(mockWalletGateway.userId, 500);
        expect(mockWalletGateway.deposit).toHaveBeenCalledWith(mockWalletGateway.userId, 500);
    });

    it("should withdraw an amount for a user", async () => {
        await mockWalletGateway.withdraw(mockWalletGateway.userId, 300);
        expect(mockWalletGateway.withdraw).toHaveBeenCalledWith(mockWalletGateway.userId, 300);
    });

    it("should transfer an amount between users", async () => {
        await mockWalletGateway.transfer(mockWalletGateway.userId, "user456", 200);
        expect(mockWalletGateway.transfer).toHaveBeenCalledWith(mockWalletGateway.userId, "user456", 200);
    });

    it("should fetch transaction history for a user", async () => {
        const history = await mockWalletGateway.getTransactionHistory(mockWalletGateway.userId);
        expect(history).toEqual([{ date: expect.any(Date), amount: 100, type: "deposit" }]);
        expect(mockWalletGateway.getTransactionHistory).toHaveBeenCalledWith(mockWalletGateway.userId);
    });
});