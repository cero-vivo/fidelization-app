import { IEcommerceOrderGateway } from "./IEcommerceOrderGateway"

export const ecommerceOrderGateway = (): IEcommerceOrderGateway => {
    return {
        createOrder(cartId, addressId) {

        },
        getOrderById(orderId) {
            
        },
        cancelOrder(orderId) {
            
        },
    }
}