import { Static, t } from "elysia";

export enum LoginControllerRoutes {
    LOGIN_EMAIL_PASS = `/login-email-pass`,
}

export const LoginEmailPassBody = t.Object({
    email: t.String({ description: "email" }),
    password: t.String({ description: "password" }),
})

export type LoginEmailPassBodyType = Static<typeof LoginEmailPassBody>;