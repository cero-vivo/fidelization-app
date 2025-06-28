import Elysia from "elysia";
import { ApiResponseBuilder } from "../../../../../http/ApiResponseBuilder";
import { appWriteRegisterGateway } from "../../gateways/register/AppWriteRegisterGateway";
import { IRegisterGateway } from "../../../domain/gateway/IRegisterGateway";
import { LoginControllerRoutes, LoginEmailPassBody } from "./ILoginController";
import { ILoginGateway } from "../../../domain/gateway/ILoginGateway";
import { appWriteLoginGateway } from "../../gateways/login/AppWriteLoginGateway";

const gateway: ILoginGateway = appWriteLoginGateway()

export const loginController = new Elysia({ prefix: '/auth' })

    .post(LoginControllerRoutes.LOGIN_EMAIL_PASS, async ({ body, status }) => {
       try {
        const res = await gateway.loginEmailPass?.({
            email: body.email,
            password: body.password
        })
        
        return status(res.code, new ApiResponseBuilder(res.code, res.payload?.message, res.payload).getError())
       } catch(er) {
            return status(500, new ApiResponseBuilder(500).getError())
       }
    }, {
        body: LoginEmailPassBody,
    })
    .get("get-user", async () => {
        return {
            "message": "Holaaaaa"
        }
    })
