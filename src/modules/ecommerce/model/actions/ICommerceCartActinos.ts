import { IEcommerceCart } from "../entities/IEcommerceCart";

export interface IEcommerceCartActions {
    setItemQuantity(productId: string, quantity: number, variantId?: string): Promise<IEcommerceCart>;
    removeItem(productId: string, variantId?:string): Promise<IEcommerceCart>;
    getCart(): Promise<IEcommerceCart>;
    clearCart(): Promise<void>;
  }
  