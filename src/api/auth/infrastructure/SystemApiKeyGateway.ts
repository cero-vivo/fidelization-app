
import { Query } from "node-appwrite";
import { appWriteDBs } from "../../../config/dbConnections";
import { ISystemApiKeyActions } from "../model/actions/ISystemApiKeyActions";
import { ISystemRoles } from "../model/entities/ISystemRoles";

export const systemApiKeyGateway = (): ISystemApiKeyActions => {
    return {
        isValid: async (key: string): Promise<{isValid: boolean, role: ISystemRoles}> => {
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