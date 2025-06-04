import { ValidationResult } from "../../global.types"
import { IRegisterValidations } from "../domain/authorization.domain"


export const registerValidations: IRegisterValidations = {

	emailIsAvailable: async (email, gateway) => {
		try {
			const res = await gateway.emailIsAvailable(email)
			return res
		} catch (e) {
			console.log("APP_LAYER::::emailIsAvailable req fails", e)
			return e
		}
	},
	usernameAvailable: async (username, gateway) => {
		try {
			const res = await gateway.usernameAvailable(username)
			return res
		} catch (e) {
			console.log("APP_LAYER::::usernameAvailable req fails", e)
			return e
		}
	},
	isValidEmail: (email: string) => {
		const errors: string[] = []

		if (!email || !email.trim()) {
			errors.push('Email is required')
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(email)) {
				errors.push('Invalid email format')
			}
		}

		return {
			isValid: errors.length === 0,
			errors
		}
	},
	isValidConfirmPassword: (password: string, confirmPassword: string) => {
		return password === confirmPassword
	},
	isValidUsername: (username: string) => {
		const errors: string[] = []

		if (!username || !username.trim()) {
			errors.push('Username is required')
		} else {
			if (username.length < 3) {
				errors.push('Username must be at least 3 characters long')
			}
			if (/\s/.test(username)) {
				errors.push('Username cannot contain spaces')
			}
		}

		return {
			isValid: errors.length === 0,
			errors
		}
	},
	isValidPassword: (password: string) => {
		const errors: string[] = []

		if (!password) {
			errors.push('Password is required')
			return { isValid: false, errors }
		}

		// Minimum 8 characters
		if (password.length < 8) {
			errors.push('Password must be at least 8 characters long')
		}

		// At least 1 uppercase letter
		if (!/[A-Z]/.test(password)) {
			errors.push('Password must contain at least one uppercase letter')
		}

		// At least 1 lowercase letter
		if (!/[a-z]/.test(password)) {
			errors.push('Password must contain at least one lowercase letter')
		}

		// At least 1 number
		if (!/\d/.test(password)) {
			errors.push('Password must contain at least one number')
		}

		return {
			isValid: errors.length === 0,
			errors
		}
	}
}

