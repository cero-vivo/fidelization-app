import { ValidationResult } from "../../../global.types"

export interface IAuthActions {
    //VALIDATIONS
    isValidEmail: (email: string) => ValidationResult
    isValidPassword: (password: string) => ValidationResult
    isValidPin: (pin: string) => ValidationResult
}
