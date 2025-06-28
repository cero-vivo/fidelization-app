import { IEcommercePaymentGateway } from "./IEcommercePaymentGateway"

export const ecommerceOrderGateway = (): IEcommercePaymentGateway => {
    return {
        payOrder(orderId, method) {
            
        },
        getPayment(paymentId) {
            
        },
    }
}