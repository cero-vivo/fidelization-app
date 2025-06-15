import jwt, { JWTOption } from "@elysiajs/jwt";
import { SystemJwtToken } from "../application/SystemJwtTokenActions";
import Elysia from "elysia";
import { SystemAuthControllerRoutes } from "./ISystemAuthControllerRoutes";
import { createApiKeyService } from "./SystemApiKeyService";
import { Routes } from "../../../routes/routes";

const systemToken = SystemJwtToken({
    secret: "Julieta Garcia y Luis Espinoza",
    algorithm: "HS256",
    expiresIn: "15m"
});

const tokenOptions: JWTOption = {
    secret: systemToken?.actions?.getters?.getSecret?.() || "",
    expiresIn: "15m",
    algorithm: systemToken.actions?.getters.getAlgorithm?.(),
};

const apiKeyService = createApiKeyService();

export const systemAuthController = new Elysia({prefix: Routes.SYSTEM_AUTH})
    .use(jwt(tokenOptions))
    .post(SystemAuthControllerRoutes.POST_GET_AUTH_TOKEN, async ({ jwt, headers }) => {
        try {

            const apiKey = headers?.["x-api-key"];

            if (!apiKey) throw new Error("API Key is missing");

            const isValid = await apiKeyService.isValid(apiKey);
            
            if (!isValid?.isValid) throw new Error("Invalid API Key");

            systemToken.actions?.update({ role: isValid.role })

            const token = await jwt.sign({
                role: systemToken.actions?.getters.getRole?.() || "GUEST",
            });

            systemToken.actions?.update({
                token: token
            })

            return systemToken?.actions?.getters?.get?.() // Devuelve el token al cliente

        } catch (error) {
            console.error("Error generating JWT token:", error);
            throw new Error("Failed to generate system access JWT token");
        }
    })
