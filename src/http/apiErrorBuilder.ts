export type HttpCode = {
    code: "500" | "400" | "401" | "403" |"404" | "498" | "200" | "201",
    message?: string // Mensaje opcional
};

const defaultMessages: Record<HttpCode["code"], string> = {
    "500": "Internal Server Error",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbbiden",
    "404": "Not Found",
    "498": "Invalid Token",
    "200": "OK",
    "201": "Created"
};

export class ApiErrorBuilder {
    private code: HttpCode["code"];
    private message: string;

    constructor(code: HttpCode["code"], message?: string) {
        this.code = code;
        this.message = message || defaultMessages[code]; // Usar mensaje predeterminado si no se proporciona
    }

    getError() {
        return {
            code: this.code,
            message: this.message
        };
    }
}