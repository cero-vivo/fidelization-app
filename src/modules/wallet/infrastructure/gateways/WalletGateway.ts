import { IWalletGateway } from "./IWalletGateway";

export const WalletGateway: () => IWalletGateway = () => {
    return {
        getBalance: async (userId: string): Promise<number> => {
            try {
                const resBalance = await new Promise<number>((resolve) => {
                    setTimeout(() => {
                        const balance = 1000;
                        resolve(balance);
                    }, 1000);
                });
                return resBalance;
            } catch (error) {
                console.error("Error fetching balance:", error);
                throw new Error("Failed to fetch balance");
            }
        },
        deposit: async (userId: string, amount: number): Promise<void> => {
            try {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        console.log(`Deposited ${amount} for user ${userId}`);
                        resolve();
                    }, 1000);
                });
            } catch (error) {
                console.error("Error depositing amount:", error);
                throw new Error("Failed to deposit amount");
            }
        },
        withdraw: async (userId: string, amount: number): Promise<void> => {
            try {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        console.log(`Withdrew ${amount} for user ${userId}`);
                        resolve();
                    }, 3000);
                });
            } catch (error) {
                console.error("Error withdrawing amount:", error);
                throw new Error("Failed to withdraw amount");
            }
        },
        transfer: async (fromUserId: string, toUserId: string, amount: number): Promise<void> => {
            try {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        console.log(`Transferred ${amount} from user ${fromUserId} to user ${toUserId}`);
                        resolve();
                    }, 4500);
                });
            } catch (error) {
                console.error("Error transferring amount:", error);
                throw new Error("Failed to transfer amount");
            }
        },
        getTransactionHistory: async (userId: string): Promise<Array<{ date: Date; amount: number; type: string }>> => {
            try {
                const history = await new Promise<Array<{ date: Date; amount: number; type: string }>>((resolve) => {
                    setTimeout(() => {
                        const transactions = [
                            { date: new Date(), amount: 100, type: "deposit" },
                            { date: new Date(), amount: 50, type: "withdraw" },
                        ];
                        resolve(transactions);
                    }, 2000);
                });
                return history;
            } catch (error) {
                console.error("Error fetching transaction history:", error);
                throw new Error("Failed to fetch transaction history");
            }
        }
    };
};
