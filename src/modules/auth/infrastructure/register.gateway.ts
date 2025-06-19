import { ID } from "node-appwrite";
import { appWriteClient, appWriteSDK } from "../../../config/clients";
import { IRegisterActions, IRegisterCredential, IRegisterValidationGateway } from "../domain/authorization.domain";

export const registerValidationsGateway: IRegisterValidationGateway = {
    emailIsAvailable: async (email) => {
        console.log("🚀 ~ emailIsAvailable: ~ email:", email)

    },
    usernameAvailable: async (username) => {
        console.log("🚀 ~ usernameAvailable: ~ username:", username)

    }
}

export const registerGateway = (): IRegisterActions => {

    return {
        register: async (credentials: IRegisterCredential) => {
            console.log("🚀 ~ register: ~ credentials:", credentials)
            try {

/*                 const emailIsAvailable = await registerValidationsGateway.emailIsAvailable(credentials.email)
                if (!emailIsAvailable) return { success: false }

                const usernameAvailable = await registerValidationsGateway.usernameAvailable(credentials.username)
                if (!usernameAvailable) return { success: false } */

                const users = new appWriteSDK.Users(appWriteClient);
                console.log("🚀 ~ register: ~ users:", users)

                /* const result = await users.create(
                    undefined,
                    credentials.email, // email
                    credentials.password, // password
                    credentials.username, // userId
                ); */
                const result = await users.create(
                    ID.unique(),
                    credentials?.email, // email (optional)
                    undefined,
                    credentials.password, // password (optional)
                    credentials.fullname // name (optional) credentials.name si eso quieres como nombre
                  );

                return result
                

            } catch (e) {
            console.log("🚀 ~ register: ~ e:", e)

            }

        }
    }
}