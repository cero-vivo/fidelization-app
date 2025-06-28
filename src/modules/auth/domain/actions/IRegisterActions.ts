import { ValidationResult } from "../../../global.types"
import { IAuthActions } from "./IAuthActions"

export interface IRegisterCredentialEmailPass {
    fullname: string
    username: string
    email: string
    password: string
    phone?: string
}

export interface IRegisterValidations extends IAuthActions {}