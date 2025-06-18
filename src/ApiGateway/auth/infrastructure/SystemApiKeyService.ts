
import { ISystemApiKeyActions } from "../model/actions/ISystemApiKeyActions";
import { ISystemRoles } from "../model/entities/ISystemRoles";

export const createApiKeyService = (): ISystemApiKeyActions => {
    return {
        isValid: async (key: string): Promise<{isValid: boolean, role: ISystemRoles}> => {
            // Here you would implement the logic to check if the API key is valid.
            // This could involve checking against a database or an in-memory store.
            // For demonstration purposes, let's assume we have a hardcoded valid key.
           try {
                let validApiKeys: string[] = [];

                const result = await new Promise<{isValid: boolean, role: ISystemRoles}>((resolve) => {
                    setTimeout(() => {
                        validApiKeys = ["valid-api-key-123", "another-valid-key-456"];
                        if (validApiKeys.includes(key)) {
                            resolve({
                                isValid: true,
                                role: ISystemRoles.SUPERADMIN
                            });
                        } else {
                            resolve({
                                isValid: false,
                                role: ISystemRoles.GUEST
                            });
                        }
                    }, 2000);
                });

                return result;

           } catch (error) {
                console.error("Error validating API key:", error);
                return {
                    isValid: false,
                    role: ISystemRoles.GUEST
                };
           }
        }
    }
}