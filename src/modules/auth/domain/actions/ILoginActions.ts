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