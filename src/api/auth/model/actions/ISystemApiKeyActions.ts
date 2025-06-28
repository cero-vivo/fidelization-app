import { ISystemRoles } from "../entities/ISystemRoles";

export interface ISystemApiKeyActions {
    isValid: (key: string) => Promise<{isValid: boolean, role: ISystemRoles}> ;
}