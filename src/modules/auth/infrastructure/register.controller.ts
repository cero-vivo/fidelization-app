import Elysia, { t } from "elysia";
import { registerGateway } from "./register.gateway";
export const registerController = new Elysia({ prefix: '/auth' })
    .post('/register', async ({ body, set }) => {

        const res = await registerGateway().register({
            fullname: body?.fullname,
            email: body?.email,
            username: body.username,
            password: body.password,
        })
        return {
            success: true,
            ...res as object
        }
    }, {
        body: t.Object({
            fullname: t.String({ description: "Full name new user" }),
            email: t.String({ description: "user register email" }),
            username: t.String({ description: "username" }),
            password: t.String({ description: "password" }),
        }),
    })