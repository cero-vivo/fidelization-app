import { Static, t } from "elysia";

export enum RegisterControllerRoutes {
    REGISTER_EMAIL_PASS = `/register-email-pass`,
    REGISTER_PROVIDER = "/register-provider",
}

export const RegisterEmailPassBody = t.Object({
    fullname: t.String({ description: "Full name new user" }),
    email: t.String({ description: "user register email" }),
    username: t.String({ description: "username" }),
    password: t.String({ description: "password" }),
})
export const RegisterProvider = t.Object({
    provider: t.String({description: "Select social media provider"}),
})

export type RegisterEmailPassBodyType = Static<typeof RegisterEmailPassBody>;
export type RegisterProviderType = Static<typeof RegisterProvider>;