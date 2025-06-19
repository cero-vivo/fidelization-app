const appWriteSDK = require("node-appwrite");

const appWriteClient = new appWriteSDK.Client();

appWriteClient
    .setEndpoint(process.env.DEV_APP_WRITE_API_ENDPOINT)
    .setProject(process.env.DEV_APP_WRITE_PROJECT_ID)
    .setKey(process.env.DEV_APP_WRITE_API_KEY);


export const appWriteDBs = new appWriteSDK.Databases(appWriteClient)