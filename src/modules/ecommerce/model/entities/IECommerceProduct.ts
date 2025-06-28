export type ICommerceProductCategory = "CATEGORY_UNDEFINED"

export interface IEcommerceProduct {
  id: string
  variantId?: string
  name: string
  description: string
  images: string[]
  price: number
  discountPercentage?: number
  inStock: number
  categories: ICommerceProductCategory[]
  createdAt: Date
  updatedAt: Date
}
