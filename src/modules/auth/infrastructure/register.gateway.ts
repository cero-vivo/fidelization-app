import { IRegisterActions, IRegisterCredential, IRegisterValidationGateway } from "../domain/authorization.domain";

export const registerValidationsGateway: IRegisterValidationGateway = {
    emailIsAvailable: async (email) => {

    },
    usernameAvailable: async (username) => {

    }
}

export const registerGateway = (): IRegisterActions => {
    return {
        register: async (credentials: IRegisterCredential) => {
            try {

                const emailIsAvailable = await registerValidationsGateway.emailIsAvailable(credentials.email)
                if(!emailIsAvailable) return {success: false}
    
                const usernameAvailable = await registerValidationsGateway.usernameAvailable(credentials.username)
                if(!usernameAvailable) return {success: false}
                
                //ACA hacer un llamado a algun servicio y registrar user
                
                return {
                    success: true
                }

            } catch(e) {

            }
           
        }
    }
}