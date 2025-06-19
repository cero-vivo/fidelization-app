export const appWriteSDK = require("node-appwrite");

export const appWriteClient = new appWriteSDK.Client();
appWriteClient
    .setEndpoint(process.env.DEV_APP_WRITE_API_ENDPOINT)
    .setProject(process.env.DEV_APP_WRITE_PROJECT_ID)
    .setKey(process.env.DEV_APP_WRITE_API_KEY)
    .setSession('')