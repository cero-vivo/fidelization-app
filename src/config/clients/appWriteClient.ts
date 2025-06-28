import { Client } from "node-appwrite";

import * as appwrite from "node-appwrite";

export const appWriteSDK = appwrite;

export const appWriteServerClient: Client = new appWriteSDK.Client();

appWriteServerClient
.setEndpoint(process.env.DEV_APP_WRITE_API_ENDPOINT || "")
.setProject(process.env.DEV_APP_WRITE_PROJECT_ID || "")
.setKey(process.env.DEV_APP_WRITE_API_KEY || "")
.setSession('');

export const appWriteLoginClient: Client = new appWriteSDK.Client();

appWriteLoginClient
.setEndpoint(process.env.DEV_APP_WRITE_API_ENDPOINT || "")
.setProject(process.env.DEV_APP_WRITE_PROJECT_ID || "")
.setSession('');

console.log("Este file esta corriendo")