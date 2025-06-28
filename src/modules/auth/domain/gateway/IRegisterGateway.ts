import { IHttpResponse } from "../../../http/model/entities/IHttpResponse"
import { IRegisterCredentialEmailPass } from "../actions/IRegisterActions"

export interface IRegisterGatewayResponses {
    registerEmailPassResponse: IHttpResponse
}

export interface IRegisterGateway<T extends IRegisterGatewayResponses = IRegisterGatewayResponses> {
    registerEmailPass: (cred: IRegisterCredentialEmailPass) => Promise<T["registerEmailPassResponse"]>
}