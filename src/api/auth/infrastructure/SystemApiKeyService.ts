
import { Query } from "node-appwrite";
import { appWriteDBs } from "../../../config/dbConnections";
import { ISystemApiKeyActions } from "../model/actions/ISystemApiKeyActions";
import { ISystemRoles } from "../model/entities/ISystemRoles";

export const createApiKeyService = (): ISystemApiKeyActions => {

    
    return {
        isValid: async (key: string): Promise<{isValid: boolean, role: ISystemRoles}> => {
            // Here you would implement the logic to check if the API key is valid.
            // This could involve checking against a database or an in-memory store.
            // For demonstration purposes, let's assume we have a hardcoded valid key.
           try {
                const apiKeyIsValid = await appWriteDBs.listDocuments(
                        process.env.DEV_APP_WRITE_DB_ID, 
                        process.env.DEV_APP_WRITE_API_KEY_COLLECTION_ID,
                        [
                            Query.equal('apiKey', key)
                        ]
                    );
                if (apiKeyIsValid.documents?.length > 0) {
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