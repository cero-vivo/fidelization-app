import { IRegisterCredentialEmailPass, IRegisterCredentialProvider } from "../../domain/actions/IRegisterActions"

export interface IRegisterGateway {
    registerEmailPass: (cred: IRegisterCredentialEmailPass) => Promise<any>
    registerProvider: (cred: IRegisterCredentialProvider) => Promise<any>
}