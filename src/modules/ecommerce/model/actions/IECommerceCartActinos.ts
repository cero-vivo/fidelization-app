import { IEcommerceCart, IEcommerceCartItem } from "../entities/IEcommerceCart"

export interface IEcommerceCartActions {
  setItemQuantity(productId: string, quantity: number, variantId?: string): Promise<IEcommerceCart>
  createCart(userId: string, cartItems: IEcommerceCartItem[]): Promise<IEcommerceCart>
  removeItem(productId: string, variantId?: string): Promise<IEcommerceCart>
  clearCart(userId: string, cartId: string): Promise<void>
}
