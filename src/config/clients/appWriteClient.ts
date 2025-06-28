import { Client } from "node-appwrite";

import * as appwrite from "node-appwrite";

export const appWriteSDK = appwrite;

export const appWriteClient: Client = new appWriteSDK.Client();

appWriteClient
.setEndpoint(process.env.DEV_APP_WRITE_API_ENDPOINT || "")
.setProject(process.env.DEV_APP_WRITE_PROJECT_ID || "")
.setKey(process.env.DEV_APP_WRITE_API_KEY || "")
.setSession('');

console.log("Este file esta corriendo")