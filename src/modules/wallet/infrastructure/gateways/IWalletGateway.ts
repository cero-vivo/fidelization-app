export interface IWalletGateway {
    getBalance: (userId: string) => Promise<number>;
    deposit: (userId: string, amount: number) => Promise<void>;
    withdraw: (userId: string, amount: number) => Promise<void>;
    transfer: (fromUserId: string, toUserId: string, amount: number) => Promise<void>;
    getTransactionHistory: (userId: string) => Promise<Array<{ date: Date; amount: number; type: string }>>;
}