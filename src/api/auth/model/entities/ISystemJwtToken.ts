import { ISystemJwtTokenActions } from "../actions/ISystemJwtTokenActions";
import { ISystemRoles } from "./ISystemRoles";

export type ISystemTokenAlgorithm = "HS256" | "HS384" | "HS512" | "PS256" | "PS384" | "PS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES256K" | "ES384" | "ES512" | "EdDSA";

export interface ISystemJwtToken {
    token: string;
    secret: string;
    role: ISystemRoles;
    expiresIn: string;
    algorithm: ISystemTokenAlgorithm
    actions: ISystemJwtTokenActions;
}
