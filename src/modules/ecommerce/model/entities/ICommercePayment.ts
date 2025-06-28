export interface IECommercePayment {
    id: string;
    orderId: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    method: string;
    transactionId?: string;
    paidAt?: string;
}
