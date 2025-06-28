import { Account } from "node-appwrite";
import { appWriteServerClient, appWriteSDK, appWriteLoginClient } from "../../../../../config/clients";
import { ILoginGateway } from "../../../domain/gateway/ILoginGateway";
import { ILoginEmailPasswordCredentials } from "../../../domain/actions/ILoginActions";
import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse";

export const appWriteLoginGateway = (): ILoginGateway => {

    const usersClient = appWriteServerClient

    return {
        loginEmailPass: async (credentials: ILoginEmailPasswordCredentials) => {
            try {
                const account = new Account(usersClient)

                const session = await account.createEmailPasswordSession(credentials.email, credentials.password);

                const users = await new appWriteSDK.Users(appWriteServerClient)
                
                const user = await users.get(session?.userId);
                
                const jwt = await users.createJWT(
                    session.userId, 
                    session.$id, 
                    
                )
                //Al setear el JWT en el cliente logeado, luego solo puedo acceder si esta creado el token en el cliente
                appWriteLoginClient.setJWT(jwt.jwt);
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
        },
        getUser: async () => {
            try {
                const account = new Account(usersClient)
                console.log("🚀 ~ getUser: ~ account:", account)
                const user = await account.get();
                console.log("🚀 ~ getUser: ~ user:", user)
                return {
                    code: 200,
                    payload: {
                        message: "Data del usuario logeado encontrado"
                    },
                    success: true
                }

            } catch(error) {
                console.log("🚀 ~ getUser: ~ error:", error)
                return {
                    code: 500,
                    payload: {},
                    success: false
                }
            }
        }

    }
}