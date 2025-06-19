
import { appWriteDBs } from "../../../config/dbConnections";
import { ISystemApiKeyActions } from "../model/actions/ISystemApiKeyActions";
import { ISystemRoles } from "../model/entities/ISystemRoles";

export const createApiKeyService = (): ISystemApiKeyActions => {

    
    return {
        isValid: async (key: string): Promise<{isValid: boolean, role: ISystemRoles}> => {
            console.log("🚀 ~ isValid: ~ key:", key)
            // Here you would implement the logic to check if the API key is valid.
            // This could involve checking against a database or an in-memory store.
            // For demonstration purposes, let's assume we have a hardcoded valid key.
           try {
                const res = await appWriteDBs.listDocuments(process.env.DEV_APP_WRITE_DB_ID, process.env.DEV_APP_WRITE_API_KEY_COLLECTION_ID);
                const validApiKeys = res.documents
                //<{isValid: boolean, role: ISystemRoles}>
                if (validApiKeys.find((validKey: { apiKey: string }) => validKey.apiKey === key)) {
                    return {
                        isValid: true,
                        role: ISystemRoles.SUPERADMIN
                    }
                } else {
                    return {
                        isValid: false,
                        role: ISystemRoles.GUEST
                    };
                }

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