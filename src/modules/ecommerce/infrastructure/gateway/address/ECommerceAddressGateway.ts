import { IEcommerceAddressGateway } from "./IEcommerceAddressGateway"


export const ecommerceAddressGateway = () : IEcommerceAddressGateway => {
    return {
        addAddress(userId, address) {
            
        },
        deleteAddress(userId, addressId) {
            
        },
        updateAddress(userId, addressId, updates) {
            
        },
        listUserAddresses(userId) {
            
        },
        setDefaultAddress(userId, addressId) {
            
        },
    }
}