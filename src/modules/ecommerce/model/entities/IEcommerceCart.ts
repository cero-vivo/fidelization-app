export interface IEcommerceCartItem {
    productId: string
    quantity: number
    selectedVariantId?: string
}

export interface IEcommerceCart {
    id: string
    userId: string
    items: IEcommerceCartItem[]
    total: number
    updatedAt: Date
}
