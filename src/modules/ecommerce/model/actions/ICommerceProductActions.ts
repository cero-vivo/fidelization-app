import { IEcommerceProduct } from "../entities/IECommerceProduct";

export interface IECommerceProductActions {
    listProducts(filter?: Partial<Pick<IEcommerceProduct, "categories" | "name" | "price" | "inStock" | "discountPercentage">>): Promise<IEcommerceProduct[]>;
    getProductById(id: string): Promise<IEcommerceProduct>;
}