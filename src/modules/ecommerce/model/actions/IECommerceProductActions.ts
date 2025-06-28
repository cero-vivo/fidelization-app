import { IEcommerceProduct } from "../entities/IECommerceProduct";

export interface IECommerceProductActions {
    listProducts(filter?: Partial<Pick<IEcommerceProduct, "categories" | "name" | "price" | "inStock" | "discountPercentage">>): Promise<IEcommerceProduct[]>;
    getProductById(id: string): Promise<IEcommerceProduct>;
    createProduct(product: Omit<IEcommerceProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<IEcommerceProduct>;
    updateProduct(productId: string, updates: Partial<IEcommerceProduct>): Promise<IEcommerceProduct>;
    deleteProduct(productId: string): Promise<void>;
}