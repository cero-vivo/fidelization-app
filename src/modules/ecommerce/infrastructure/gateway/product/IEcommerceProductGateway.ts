import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse"
import { IECommerceAddressActions } from "../../../model/actions/IECommerceAddressActions"
import { IEcommerceCartActions } from "../../../model/actions/IECommerceCartActinos"
import { IECommerceOrderActions } from "../../../model/actions/IECommerceOrderActions"
import { IECommercePaymentActions } from "../../../model/actions/IECommercePaymentActions"
import { IECommerceProductActions } from "../../../model/actions/IECommerceProductActions"
import { IEcommerceProduct } from "../../../model/entities/IECommerceProduct"

export interface IEcommerceProductGatewayResponses {
    listProducts: IHttpResponse<{
        products: IEcommerceProduct[]
    }>,
    getProductById: IHttpResponse<{
        product: IEcommerceProduct
    }>,
    createProduct: IHttpResponse<{
        product: IEcommerceProduct
    }>,
    updateProduct: IHttpResponse<{
        product: IEcommerceProduct
    }>,
    deleteProduct: IHttpResponse<{
        product: IEcommerceProduct
    }>,
}

export interface IEcommerceProductGateway <T extends IEcommerceProductGatewayResponses = IEcommerceProductGatewayResponses> {
    listProducts(filter?: Partial<Pick<IEcommerceProduct, "categories" | "name" | "price" | "inStock" | "discountPercentage">>): Promise<T["listProducts"]>;
    getProductById(id: string): Promise<T["getProductById"]>;
    createProduct(product: Omit<IEcommerceProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<T["createProduct"]>;
    updateProduct(productId: string, updates: Partial<IEcommerceProduct>): Promise<T["updateProduct"]>;
    deleteProduct(productId: string): Promise<T["deleteProduct"]>;
}