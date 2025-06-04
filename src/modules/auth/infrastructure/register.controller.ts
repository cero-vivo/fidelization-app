import Elysia from "elysia";

export const registerController = new Elysia({ prefix: '/auth' })
    .post('/register', async ({ body, set }) => {
        
        console.log(body)
        return {
            success: true,
            ...body as object
        }
    })