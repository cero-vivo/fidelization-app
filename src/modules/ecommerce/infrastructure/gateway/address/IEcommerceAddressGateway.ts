import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse"
import { IECommerceAddress } from "../../../model/entities/IEcommerceAddress";

export interface IEcommerceAddressGatewayResponses {
    addAddress: IHttpResponse<{
        address: IECommerceAddress
    }>,
    updateAddress: {
        address: IECommerceAddress
    },
    deleteAddress: {
        address: IECommerceAddress
    },
    listUserAddresses: {
        address: IECommerceAddress[]
    },
    setDefaultAddress: {
        address: IECommerceAddress
    }
}

export interface IEcommerceAddressGateway<T extends IEcommerceAddressGatewayResponses = IEcommerceAddressGatewayResponses> {
    addAddress(userId: string, address: Omit<IECommerceAddress, 'id' | 'userId'>): Promise<T["addAddress"]>;
    updateAddress(userId: string, addressId: string, updates: Partial<IECommerceAddress>): Promise<T["updateAddress"]>;
    deleteAddress(userId: string, addressId: string): Promise<T["deleteAddress"]>;
    listUserAddresses(userId: string): Promise<T["listUserAddresses"]>;
    setDefaultAddress(userId: string, addressId: string): Promise<T["setDefaultAddress"]>;
}