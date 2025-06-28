import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse"
import { IECommercePayment } from "../../../model/entities/ICommercePayment";

export interface IEcommercePaymentGatewayResponses {
    payOrder: IHttpResponse<{
        payment: IECommercePayment
    }>,
    getPayment: IHttpResponse<{
        payment: IECommercePayment
    }>,
}

export interface IEcommercePaymentGateway<T extends IEcommercePaymentGatewayResponses = IEcommercePaymentGatewayResponses> {
    payOrder(orderId: string, method: string): Promise<T["payOrder"]>;
    getPayment(paymentId: string): Promise<T["getPayment"]>;
}