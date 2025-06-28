import { IHttpResponse } from "../../../http/model/entities/IHttpResponse"
import { ILoginEmailPasswordCredentials } from "../actions/ILoginActions"

export interface ILoginGatewayResponses {
    loginEmailPassword: IHttpResponse<{
        sessionToken: string
    }>
}

export interface ILoginGateway<T extends ILoginGatewayResponses = ILoginGatewayResponses> {
    loginEmailPass: (cred: ILoginEmailPasswordCredentials) => Promise<T["loginEmailPassword"]>
}