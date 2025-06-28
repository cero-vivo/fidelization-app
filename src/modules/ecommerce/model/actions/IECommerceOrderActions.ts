import { IECommerceOrder } from "../entities/ICommerceOrder";

export interface IECommerceOrderActions {
    createOrder(cartId: string, addressId: string): Promise<IECommerceOrder>;
    getOrderById(orderId: string): Promise<IECommerceOrder>;
    cancelOrder(orderId: string): Promise<IECommerceOrder>;
}