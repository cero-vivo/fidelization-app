import { appWriteServerClient, appWriteSDK } from "./clients/index"

export const appWriteDBs = new appWriteSDK.Databases(appWriteServerClient)