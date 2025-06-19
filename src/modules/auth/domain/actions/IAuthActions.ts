import { ILoginCredential } from "./ILoginActions"
import { IRegisterCredential } from "./IRegisterActions"

export interface IAuthActions {
    login: (cred: ILoginCredential) => Promise<any>
    register: (cred: IRegisterCredential) => Promise<any>
}
