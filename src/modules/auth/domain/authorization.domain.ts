import { ValidationResult } from "../../global.types"

//-----LOGIN-----
export interface ILoginUsernamePassword {
    username: string
    password: string
}
export interface ILoginEmailPassword {
    email: string
    password: string
}
export type ILoginCredential = ILoginUsernamePassword | ILoginEmailPassword
export interface ILoginActions {
    login: (cred: ILoginCredential) => Promise<any>
}
export interface ILoginValidations {
    isValidEmail: (email: string) => boolean
}
export interface IRegisterActions {
    register: (cred: IRegisterCredential) => Promise<any>
}


//-----REGISTER-----
export interface IRegisterValidationGateway {
    emailIsAvailable: (email: string) => Promise<any>
    usernameAvailable: (username: string) => Promise<any>
}
export interface IRegisterValidations {
    emailIsAvailable: (email: string, gateway: IRegisterValidationGateway) => Promise<any>
    usernameAvailable: (username: string, gateway: IRegisterValidationGateway) => Promise<any>
    isValidEmail: (email: string) => ValidationResult
    isValidUsername: (username: string) => ValidationResult
    isValidPassword: (password: string) => ValidationResult
}
export interface IRegisterCredential {
    fullname: string
    username: string
    email: string
    password: string
}
export interface IAuthActions {
    login: (cred: ILoginCredential) => Promise<any>
    register: (cred: IRegisterCredential) => Promise<any>
}
