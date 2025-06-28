import { IECommercePayment } from "../entities/ICommercePayment";

export interface IECommercePaymentActions {
    //TODO: REFINE METHOD TYPE
    payOrder(orderId: string, method: string): Promise<IECommercePayment>;
    getPayment(paymentId: string): Promise<IECommercePayment>;
  }