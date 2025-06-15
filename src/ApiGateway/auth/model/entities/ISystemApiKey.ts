import { ISystemRoles } from "./ISystemRoles";

export interface ISystemApiKey {
    key: string;
    actions: ISystemApiKeyActions
}