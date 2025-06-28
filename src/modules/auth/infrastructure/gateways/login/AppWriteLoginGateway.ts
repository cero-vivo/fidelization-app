import { Account } from "node-appwrite";
import { appWriteClient, appWriteSDK } from "../../../../../config/clients";
import { ILoginGateway } from "../../../domain/gateway/ILoginGateway";
import { ILoginEmailPasswordCredentials } from "../../../domain/actions/ILoginActions";
import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse";

export const appWriteLoginGateway = (): ILoginGateway => {

    const usersClient = appWriteClient

    return {
        loginEmailPass: async (credentials: ILoginEmailPasswordCredentials) => {
            try {
                const account = new Account(usersClient)

                const session = await account.createEmailPasswordSession(credentials.email, credentials.password);

                const users = await new appWriteSDK.Users(usersClient)
                
                const user = await users.get(session?.userId);
                
                const jwt = await users.createJWT(
                    session.userId, 
                    session.$id, 
                    5
                )
                //Al setear el JWT en el cliente luego solo puedo acceder si esta creado el token en el cliente
                usersClient.setJWT(jwt.jwt);
                return {
                    code: 200,
                    success: true,
                    payload: {
                        message:`Hi again ${user?.name}` ,
                        jwt,
                        sessionToken: session?.secret,
                        user,
                    }
                }
            } catch (e: any) {
                return e
            }
        }
    }
}