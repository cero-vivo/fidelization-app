import { ID } from "node-appwrite";
import { appWriteClient, appWriteSDK } from "../../../../config/clients";
import { IRegisterCredentialEmailPass } from "../../domain/actions/IRegisterActions";
import { IRegisterGateway } from "./IRegisterGateway";

export const registerGateway = (): IRegisterGateway => {

    const usersClient = appWriteClient
    const usersSDK = appWriteSDK

    return {
        registerEmailPass: async (credentials: IRegisterCredentialEmailPass) => {
            try {
                const users = new usersSDK.Users(usersClient);
                const result = await users.create(
                    ID.unique(),
                    credentials?.email,
                    undefined,//phone
                    credentials?.password || "", 
                    credentials?.fullname || "" 
                  )
                return result
            } catch (e) {
                return e
            }

        },
        registerProvider: async () => null
    }
}