import { HttpStatusCode } from "../modules/http/model/entities/IHttpResponse";

export type HttpCode = {
    code: HttpStatusCode
    message?: string // Mensaje opcional
};

const defaultMessages: Partial<Record<HttpCode["code"], string>> = {
    "500": "Internal Server Error",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbbiden",
    "404": "Not Found",
    "498": "Invalid Token",
    "200": "OK",
    "201": "Created"
};

export class ApiResponseBuilder {
    private code: HttpCode["code"];
    private message?: string;
    private data: any

    constructor(code: HttpCode["code"], message?: string, data?: any) {
        this.code = code;
        this.message = message || defaultMessages[code] || undefined
        this.data = data
    }

    getError() {
        let res: HttpCode & {data?: any} = {
            code: this.code
        }
        if(this.message) res.message = this.message
        if(this.data) res.data = this.data 
        return res
       
    }
}