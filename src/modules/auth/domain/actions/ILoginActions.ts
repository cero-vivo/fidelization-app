import { ValidationResult } from "../../../global.types"

export interface ILoginEmailPasswordCredentials {
    email: string
    password: string
}

export interface ILoginValidations {
    isValidEmail: (email: string) => ValidationResult
}