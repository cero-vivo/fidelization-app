import { appWriteClient, appWriteSDK } from "./clients/index"

export const appWriteDBs = new appWriteSDK.Databases(appWriteClient)