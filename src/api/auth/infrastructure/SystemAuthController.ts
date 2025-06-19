import Elysia from "elysia";
import jwt, { JWTOption } from "@elysiajs/jwt";
import { SystemJwtToken } from "../application/SystemJwtTokenActions";
import { SystemAuthControllerRoutes } from "./ISystemAuthControllerRoutes";
import { systemApiKeyGateway } from "./SystemApiKeyGateway";
import { Routes } from "../../../routes/routes";
import { ApiResponseBuilder } from "../../../http/ApiResponseBuilder";
import { ISystemTokenAlgorithm } from "../model/entities/ISystemJwtToken";

const systemToken = SystemJwtToken({
	secret: process.env.DEV_JWT_SECRET,
	algorithm: process.env.DEV_JWT_ALGORITHM as ISystemTokenAlgorithm,
	expiresIn: process.env.DEV_JWT_ACCESS_EXPIRES_IN
});

const systemRefreshToken = SystemJwtToken({
	secret: process.env.DEV_JWT_SECRET,
	algorithm: process.env.DEV_JWT_ALGORITHM as ISystemTokenAlgorithm,
	expiresIn: process.env.DEV_JWT_REFRESH_EXPIRES_IN
});

const tokenOptions: JWTOption = {
	//@ts-ignore
	name: process.env.DEV_JWT_ACCESS_NAME,
	secret: systemToken?.actions?.getters?.getSecret?.() || "",
	exp: systemToken?.actions?.getters?.getExpiresIn?.(),
	algorithm: systemToken.actions?.getters.getAlgorithm?.(),
};

const refreshTokenOptions: JWTOption = {
	//@ts-ignore
	name: process.env.DEV_JWT_REFRESH_NAME,
	secret: systemRefreshToken?.actions?.getters?.getSecret?.() || "",
	exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.(),
	algorithm: systemRefreshToken.actions?.getters.getAlgorithm?.(),
};

export const systemAuthController = new Elysia({ prefix: Routes.SYSTEM_AUTH })
	.use(jwt(tokenOptions))
	.use(jwt(refreshTokenOptions))
	.post(SystemAuthControllerRoutes.POST_GET_AUTH_TOKEN, async ({ accessJwt, refreshJwt, headers, status }) => {
		try {

			const apiKeyService = systemApiKeyGateway();

			const apiKey = headers?.["x-api-key"];

			if (!apiKey) return status(400, new ApiResponseBuilder("400", "API Key is missing").getError())

			const isValid = await apiKeyService.isValid(apiKey);

			if (!isValid?.isValid) return status(401, new ApiResponseBuilder("401", "Invalid API Key").getError());

			systemToken.actions?.update({ role: isValid.role })
			systemRefreshToken.actions?.update({ role: isValid.role })

			const token = await accessJwt.sign({
				name: process.env.DEV_JWT_ACCESS_NAME,
				exp: systemToken?.actions?.getters?.getExpiresIn?.()
			});

			const refreshToken = await refreshJwt.sign({
				name: process.env.DEV_JWT_REFRESH_NAME,
				exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.()
			});

			systemToken.actions?.update({ token: token })
			systemRefreshToken.actions?.update({ token: refreshToken })

			return status(201, new ApiResponseBuilder("201", "Tokens created successfully",
				{
					accessToken: systemToken?.actions?.getters?.get?.(),
					refreshToken: systemRefreshToken?.actions?.getters?.get?.()
				}
			).getError())

		} catch (error) {
			console.error("Error generating JWT token:", error);
			return status(500, new ApiResponseBuilder("500", "Failed to generate system access JWT token").getError());
		}
	})
	.post(SystemAuthControllerRoutes.POST_REFRESH_AUTH_TOKEN, async ({ refreshJwt, accessJwt, status, headers }) => {
		try {
			const refreshTokenHeader = headers?.[process.env.DEV_JWT_TOKEN_HEADER_KEY || ""]

			if (!refreshTokenHeader) return status(401, new ApiResponseBuilder("401", "Refresh token not found").getError())
			const res = await refreshJwt.verify(refreshTokenHeader);

			if (!res) return status(403, new ApiResponseBuilder("403", "Expired refresh token").getError())
			if (res?.name !== process.env.DEV_JWT_REFRESH_NAME) return status(403, new ApiResponseBuilder("403", "Invalid refresh token").getError())

			const token = await accessJwt.sign({
				name: process.env.DEV_JWT_ACCESS_NAME,
				exp: systemToken?.actions?.getters?.getExpiresIn?.()
			});

			const refreshToken = await refreshJwt.sign({
				name: process.env.DEV_JWT_REFRESH_NAME,
				exp: systemRefreshToken?.actions?.getters?.getExpiresIn?.()
			});

			systemToken.actions?.update({ token: token })
			systemRefreshToken.actions?.update({ token: refreshToken })

			return status(201, new ApiResponseBuilder("201", "Tokens refresh successfully",
				{
					accessToken: systemToken?.actions?.getters?.get?.(),
					refreshToken: systemRefreshToken?.actions?.getters?.get?.()
				}
			).getError())


		} catch (error) {
			return status(498, new ApiResponseBuilder("498", "Invalid access token").getError())
		}
	})