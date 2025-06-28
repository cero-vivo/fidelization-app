import Elysia from "elysia";
import { RegisterControllerRoutes, RegisterEmailPassBody } from "./IRegisterController";
import { ApiResponseBuilder } from "../../../../../http/ApiResponseBuilder";
import { appWriteRegisterGateway } from "../../gateways/register/AppWriteRegisterGateway";
import { IRegisterGateway } from "../../../domain/gateway/IRegisterGateway";
import { IHttpResponse } from "../../../../http/model/entities/IHttpResponse";

const gateway: IRegisterGateway = appWriteRegisterGateway()

export const registerController = new Elysia({ prefix: '/auth' })
    .post(RegisterControllerRoutes.REGISTER_EMAIL_PASS, async ({ body, status }) => {
       try {
        const res = await gateway.registerEmailPass?.({
            fullname: body?.fullname,
            email: body?.email,
            username: body.username,
            password: body.password
        })
        
        return status(res.code, new ApiResponseBuilder(res.code, res.payload?.message).getError())

       } catch(error: any) {
            return status(error?.code, new ApiResponseBuilder(error?.code, error?.payload?.message).getError())
       }
    }, {
        body: RegisterEmailPassBody
    })
