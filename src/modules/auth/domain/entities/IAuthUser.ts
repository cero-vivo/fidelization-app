export interface IAuthUser {
    id: string
    fullname?:string
    password: string
    pin?: number
    email?: string
    phone?: string
}