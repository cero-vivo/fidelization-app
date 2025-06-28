import { ISystemJwtToken } from "../model/entities/ISystemJwtToken";
import { ISystemRoles } from "../model/entities/ISystemRoles";

export const SystemJwtToken: (newToken: Partial<ISystemJwtToken>) => ISystemJwtToken = (newToken: Partial<ISystemJwtToken>) => {

    if (!newToken) throw new Error("Token object is not defined");
    if (!newToken?.secret) throw new Error("Secret property is missing");
    if (!newToken?.algorithm) throw new Error("Algorithm property is missing");
    if (!newToken?.expiresIn) throw new Error("ExpiresIn property is missing");

    let token: ISystemJwtToken = {

        token: newToken?.token || "",
        secret: newToken?.secret || "",
        role: newToken?.role || ISystemRoles.GUEST,
        expiresIn: newToken?.expiresIn || "15m",
        algorithm: newToken?.algorithm || "HS256",

        actions: {
            update: (patch: Partial<Pick<ISystemJwtToken, "token" | "algorithm" | "role" | "expiresIn" | "secret">>) => {
                token = { ...token, ...patch }
            },
            getters: {
                get: () => {
                    tokenIsMounted()
                    return {
                        token: token?.token,
                        role: token?.role,
                        expiresIn: token?.expiresIn
                    }
                },
                getToken: () => {
                    if (!token?.token) throw new Error("Token is not set");
                    return token.token;
                },
                getSecret: () => {
                    if (!token?.secret) throw new Error("Token secret is not set");
                    return token?.secret;
                },
                getRole: () => {
                    if (!token?.role) throw new Error("Token role is not set");
                    return token?.role;
                },
                getExpiresIn: () => {
                    if (!token?.expiresIn) throw new Error("Token expiration time is not set");
                    return token?.expiresIn;
                },
                getAlgorithm: () => {
                    if (!token?.algorithm) throw new Error("Token algorithm is not set");
                    return token?.algorithm;
                }
            }
        }
    };

    const tokenIsMounted = () => {
        if (!token) throw new Error("Token object is not defined");
        if (!token?.token) throw new Error("Token property is missing");
        if (!token?.secret) throw new Error("Secret property is missing");
        if (!token?.role) throw new Error("Role property is missing");
        if (!token?.expiresIn) throw new Error("ExpiresIn property is missing");
        if (!token?.algorithm) throw new Error("Algorithm property is missing");
        return true;
    };
    
    return token;
}