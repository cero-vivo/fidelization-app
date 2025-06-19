import Elysia, { t } from "elysia";
import { RegisterControllerRoutes, RegisterEmailPassBody } from "./IRegisterController";
import { registerActions } from "../../application/RegisterActions";
import { ApiResponseBuilder } from "../../../../http/ApiResponseBuilder";

const actions = registerActions()

export const registerController = new Elysia({ prefix: '/auth' })
    .post(RegisterControllerRoutes.REGISTER_EMAIL_PASS, async ({ body, status }) => {
       try {
        const res = await actions.registerEmailPass?.({
            fullname: body?.fullname,
            email: body?.email,
            username: body.username,
            password: body.password,
        })
        return status(res.code, new ApiResponseBuilder(res.code?.toString(), res.message).getError())
       } catch(er) {
            return status(500, new ApiResponseBuilder("500").getError())
       }

    }, {
        body: RegisterEmailPassBody,
    })
