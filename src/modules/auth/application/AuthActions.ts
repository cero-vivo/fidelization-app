import { ValidationResult } from "../../global.types"
import { IAuthActions } from "../domain/actions/IAuthActions"

export const authActions = (): IAuthActions => {

    return {
        isValidEmail: (email: string) => {
            const emailRegexValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            const response: ValidationResult = {
                errors: ["Invalid format"],
                isValid: emailRegexValidation.test(email)
            }
            return response
        },
        isValidPassword: (password: string) => {

            const passwordRegexValidation = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

            const response: ValidationResult = {
                errors: ["Invalid format"],
                isValid: passwordRegexValidation.test(password)

            }

            return response
        },
        isValidPin: (pin: string) => {
            const pinRegex = /^\d{6}$/;
        
            const response: ValidationResult = {
                errors: ["Invalid format"],
                isValid: pinRegex.test(pin)
            };
        
            return response;
        }
    }
}