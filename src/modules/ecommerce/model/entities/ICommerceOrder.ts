import { IECommerceAddress } from "./IEcommerceAddress"
import { IEcommerceCartItem } from "./IEcommerceCart"

export type IEcommerceOrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled"
export type IEcommerceOrderPaymentMethods = "card" | "paypal" | "transfer" | "cash"

export interface IECommerceOrder {
    id: string
    userId: string
    items: IEcommerceCartItem[]
    status: IEcommerceOrderStatus
    total: number
    paymentMethod: IEcommerceOrderPaymentMethods
    shippingAddress: IECommerceAddress
    createdAt: string
}
