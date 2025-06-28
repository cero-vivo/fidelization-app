import { IEcommerceCartGateway } from "./IEcommerceCartGateway";

export const ecommerceCartGateway = () : IEcommerceCartGateway => {
    return {
        createCart(userId, cartItems) {
            
        },
        setItemQuantity(productId, quantity, variantId) {
            
        },
        removeItem(productId, variantId) {
            
        },
        clearCart(userId, cartId) {
            
        },
    }
}