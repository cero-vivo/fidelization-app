import { ISystemJwtToken, ISystemTokenAlgorithm } from "../entities/ISystemJwtToken"
import { ISystemRoles } from "../entities/ISystemRoles"

export interface ISystemJwtTokenActions {
    update: (newToken: Partial<ISystemJwtToken>) => void
    getters: Partial<Getters>
}
interface Getters {
    get: () => Pick<ISystemJwtToken, "token" | "expiresIn" | "role">
    getToken: () => string
    getSecret: () => string
    getRole: () => ISystemRoles
    getExpiresIn: () => string
    getAlgorithm: () => ISystemTokenAlgorithm
}
