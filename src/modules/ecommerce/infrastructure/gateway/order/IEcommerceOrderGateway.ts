import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse"
import { IECommerceOrder } from "../../../model/entities/ICommerceOrder";

export interface IEcommerceOrderGatewayResponses {
    createOrder: IHttpResponse<{
        order: IECommerceOrder
    }>,
    getOrderById: IHttpResponse<{
        order: IECommerceOrder
    }>,
}

export interface IEcommerceOrderGateway<T extends IEcommerceOrderGatewayResponses = IEcommerceOrderGatewayResponses> {
    createOrder(cartId: string, addressId: string): Promise<T["createOrder"]>;
    getOrderById(orderId: string): Promise<T["getOrderById"]>;
    cancelOrder(orderId: string): Promise<any>;
}