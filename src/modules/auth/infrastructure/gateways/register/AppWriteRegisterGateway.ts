import { Account, ID } from "node-appwrite";
import { appWriteClient } from "../../../../../config/clients";
import { IRegisterCredentialEmailPass } from "../../../domain/actions/IRegisterActions";
import { IRegisterGateway } from "../../../domain/gateway/IRegisterGateway";

export const appWriteRegisterGateway = (): IRegisterGateway => {

    const usersClient = appWriteClient

    return {
        registerEmailPass: async (credentials: IRegisterCredentialEmailPass) => {
            try {
                const users = new Account(usersClient);
                const result = await users.create(
                    ID.unique(),
                    credentials?.email,
                    credentials?.password || "", 
                    credentials?.fullname || "" 
                  )
                return {
                    code: 201,
                    success: false,
                    payload: {
                        message: "User successfully created!",
                        user: result
                    }

                }
            } catch (error: any) {
                return {
                    code: error?.code,
                    success: false,
                    payload: {
                        message: error?.message
                    }
                }
            }
        }
    }
}