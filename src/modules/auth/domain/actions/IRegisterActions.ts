import { ValidationResult } from "../../../global.types"

export interface IRegisterActions {
    registerEmailPass: (cred: IRegisterCredentialEmailPass) => Promise<any>
    registerProvider: (cred: IRegisterCredentialProvider) => Promise<any>
}
export interface IRegisterValidations {
    isValidEmail: (email: string) => ValidationResult
    isValidPassword: (password: string) => ValidationResult
}
export interface IRegisterCredentialEmailPass {
    fullname: string
    username: string
    email: string
    password: string
}
export interface IRegisterCredentialProvider {
    email: string
    provider: string
}
export type IRegisterCredential = IRegisterCredentialEmailPass | IRegisterCredentialProvider