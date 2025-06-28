import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse"
import { IEcommerceCart, IEcommerceCartItem } from "../../../model/entities/IEcommerceCart"

export interface IEcommerceCartGatewayResponses {
    setItemQuantity: IHttpResponse<{
        Carts: IEcommerceCart[]
    }>,
    removeItem: IHttpResponse<{
        Carts: IEcommerceCart
    }>,
    getCart: IHttpResponse<{
        Carts: IEcommerceCart
    }>,
}

export interface IEcommerceCartGateway<T extends IEcommerceCartGatewayResponses = IEcommerceCartGatewayResponses> {
    setItemQuantity(productId: string, quantity: number, variantId?: string): Promise<T["setItemQuantity"]>
    removeItem(productId: string, variantId?: string): Promise<T["removeItem"]>
    createCart(userId:string, cartItems: IEcommerceCartItem[]): Promise<T["getCart"]>
    clearCart(userId:string, cartId: string): Promise<void>
}