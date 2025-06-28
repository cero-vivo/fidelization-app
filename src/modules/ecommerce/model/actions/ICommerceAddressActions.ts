import { IECommerceAddress } from "../entities/IEcommerceAddress";

export interface IECommerceAddressActions {
    addAddress(userId: string, address: Omit<IECommerceAddress, 'id' | 'userId'>): Promise<IECommerceAddress>;
    updateAddress(userId:string, addressId: string, updates: Partial<IECommerceAddress>): Promise<IECommerceAddress>;
    deleteAddress(userId:string, addressId: string): Promise<void>;
    listUserAddresses(userId: string): Promise<IECommerceAddress[]>;
    setDefaultAddress(userId:string, addressId: string): Promise<IECommerceAddress>;
  }