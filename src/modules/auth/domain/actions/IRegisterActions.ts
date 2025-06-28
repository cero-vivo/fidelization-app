import { ValidationResult } from "../../../global.types"

export interface IRegisterCredentialEmailPass {
    fullname: string
    username: string
    email: string
    password: string
}

export interface IRegisterValidations {
    isValidEmail: (email: string) => ValidationResult
    isValidPassword: (password: string) => ValidationResult
    isValidPin: (pin: string) => ValidationResult
}