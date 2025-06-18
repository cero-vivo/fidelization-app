import Elysia from "elysia";
import jwt, { JWTOption } from "@elysiajs/jwt";
import { SystemJwtToken } from "../application/SystemJwtTokenActions";
import { SystemAuthControllerRoutes } from "./ISystemAuthControllerRoutes";
import { createApiKeyService } from "./SystemApiKeyService";
import { Routes } from "../../../routes/routes";
import { ApiErrorBuilder } from "../../../http/apiErrorBuilder";
import { ISystemTokenAlgorithm } from "../model/entities/ISystemJwtToken";
import 'dotenv/config'

const systemToken = SystemJwtToken({
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM as ISystemTokenAlgorithm,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
});

const systemRefreshToken = SystemJwtToken({
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM as ISystemTokenAlgorithm,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
});


const tokenOptions: JWTOption = {
    //@ts-ignore
    name: "accessJwt",
    secret: systemToken?.actions?.getters?.getSecret?.() || "",
    exp: systemToken?.actions?.getters?.getExpiresIn?.(),
    algorithm: systemToken.actions?.getters.getAlgorithm?.(),
};
console.log("🚀 ~ tokenOptions:", tokenOptions)
const refreshTokenOptions: JWTOption = {
    //@ts-ignore
    name: "refreshJwt",
    secret: systemRefreshToken?.actions?.getters?.getSecret?.() || "",
    exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.(),
    algorithm: systemRefreshToken.actions?.getters.getAlgorithm?.(),
};
console.log("🚀 ~ refreshTokenOptions:", refreshTokenOptions)


export const systemAuthController = new Elysia({ prefix: Routes.SYSTEM_AUTH })
    .use(jwt(tokenOptions))
    .use(jwt(refreshTokenOptions))
    .post(SystemAuthControllerRoutes.POST_GET_AUTH_TOKEN, async ({ accessJwt, refreshJwt, headers, status }) => {
        try {

            const apiKeyService = createApiKeyService();

            const apiKey = headers?.["x-api-key"];

            if (!apiKey) return status(400, new ApiErrorBuilder("400", "API Key is missing").getError())

            const isValid = await apiKeyService.isValid(apiKey);

            if (!isValid?.isValid) return status(401, new ApiErrorBuilder("401", "Invalid API Key").getError());

            systemToken.actions?.update({ role: isValid.role })
            systemRefreshToken.actions?.update({ role: isValid.role })

            const token = await accessJwt.sign({
                name: "accessJwt",
                exp: systemToken?.actions?.getters?.getExpiresIn?.()
            });

            const refreshToken = await refreshJwt.sign({
                name: "refreshJwt",
                exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.()
            });

            systemToken.actions?.update({ token: token })
            systemRefreshToken.actions?.update({ token: refreshToken })

            return {
                code: 201,
                accessToken: systemToken?.actions?.getters?.get?.(),
                refreshToken: systemRefreshToken?.actions?.getters?.get?.(),
            }

        } catch (error) {
            console.error("Error generating JWT token:", error);
            return status(500, new ApiErrorBuilder("500", "Failed to generate system access JWT token").getError());
        }
    })
    .post(SystemAuthControllerRoutes.POST_REFRESH_AUTH_TOKEN, async ({ refreshJwt, accessJwt, status, headers }) => {
        try {
            const refreshTokenHeader = headers?.["authorization"]
            if (!refreshTokenHeader) return status(401, new ApiErrorBuilder("401", "Refresh token not found").getError())
            const res = await refreshJwt.verify(refreshTokenHeader);

            if (!res) return status(403, new ApiErrorBuilder("403", "Expired refresh token").getError())
            if (res?.name !== "refreshJwt") return status(403, new ApiErrorBuilder("403", "Invalid refresh token").getError())

            const token = await accessJwt.sign({
                name: "accessJwt",
                exp: systemToken?.actions?.getters?.getExpiresIn?.()
            });

            const refreshToken = await refreshJwt.sign({
                name: "refreshJwt",
                exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.()
            });

            systemToken.actions?.update({ token: token })
            systemRefreshToken.actions?.update({ token: refreshToken })

            return {
                code: 201,
                accessToken: systemToken?.actions?.getters?.get?.(),
                refreshToken: systemRefreshToken?.actions?.getters?.get?.(),
            }

            
        } catch (error) {
            return status(498, new ApiErrorBuilder("498", "Invalid access token").getError())
        }
    })
