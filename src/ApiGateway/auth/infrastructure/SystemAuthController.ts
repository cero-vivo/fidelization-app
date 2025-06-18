import Elysia from "elysia";
import jwt, { JWTOption } from "@elysiajs/jwt";
import { SystemJwtToken } from "../application/SystemJwtTokenActions";
import { SystemAuthControllerRoutes } from "./ISystemAuthControllerRoutes";
import { createApiKeyService } from "./SystemApiKeyService";
import { Routes } from "../../../routes/routes";
import { ApiErrorBuilder } from "../../../http/apiErrorBuilder";

const systemToken = SystemJwtToken({
    secret: "Julieta Garcia y Luis Espinoza",
    algorithm: "HS256",
    expiresIn: "15m"
});
const systemRefreshToken = SystemJwtToken({
    secret: "Julieta Garcia y Luis Espinoza",
    algorithm: "HS256",
    expiresIn: "1d"
});

const tokenOptions: JWTOption = {
    secret: systemToken?.actions?.getters?.getSecret?.() || "",
    exp: systemToken?.actions?.getters?.getExpiresIn?.(),
    algorithm: systemToken.actions?.getters.getAlgorithm?.(),
};
const refreshTokenOptions: JWTOption = {
    secret: systemRefreshToken?.actions?.getters?.getSecret?.() || "",
    exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.(),
    algorithm: systemRefreshToken.actions?.getters.getAlgorithm?.(),
};


export const systemAuthController = new Elysia({prefix: Routes.SYSTEM_AUTH})
    .use(jwt(tokenOptions))
    .use(jwt(refreshTokenOptions))
    .post(SystemAuthControllerRoutes.POST_GET_AUTH_TOKEN, async ({ jwt, headers }) => {
        try {

            const apiKeyService = createApiKeyService();

            const apiKey = headers?.["x-api-key"];

            if (!apiKey) return new ApiErrorBuilder("400","API Key is missing").getError();

            const isValid = await apiKeyService.isValid(apiKey);
            console.log("🚀 ~ .post ~ isValid:", !isValid?.isValid)
            
            if (!isValid?.isValid === false) return new ApiErrorBuilder("401","Invalid API Key").getError();

            systemToken.actions?.update({ role: isValid.role })
            systemRefreshToken.actions?.update({ role: isValid.role })

            const token = await jwt.sign({
                role: systemToken.actions?.getters.getRole?.() || "GUEST",
            });

            const refreshToken = await jwt.sign({
                role: systemRefreshToken.actions?.getters.getRole?.() || "GUEST",
            });

            systemToken.actions?.update({ token: token })
            systemRefreshToken.actions?.update({ token: refreshToken })

            return {
                accessToken: systemToken?.actions?.getters?.get?.(),
                refreshToken: systemRefreshToken?.actions?.getters?.get?.(),
            }

        } catch (error) {
            console.error("Error generating JWT token:", error);
            throw new Error("Failed to generate system access JWT token");
        }
    })
    .post(SystemAuthControllerRoutes.POST_REFRESH_AUTH_TOKEN, async ({ jwt }) => {
        try {
            const res = await jwt.verify(systemRefreshToken?.actions?.getters?.getSecret?.());
            if(!res) return { code: 400, message: "accessToken not found"}
            console.log("🚀 ~ .post ~ res:", res)
        } catch (error) {
            console.error("Error verifying JWT token:", error);
            throw new Error("Invalid refresh token");
        }
    })
