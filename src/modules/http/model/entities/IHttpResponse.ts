type WithMessage = {
    payload?: Record<string, any> & { message: string };
};

export interface IHttpResponse<T extends WithMessage = WithMessage> {
    code: HttpStatusCode;
    success: boolean;
    payload: T["payload"] | undefined;
}

export type HttpStatusCode =
    // 1xx: Informational
    | 100 | 101 | 102 | 103

    // 2xx: Success
    | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226

    // 3xx: Redirection
    | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308

    // 4xx: Client Errors
    | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407
    | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415
    | 416 | 417 | 418 | 422 | 423 | 424 | 426 | 428
    | 429 | 431 | 451 | 498

    // 5xx: Server Errors
    | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507
    | 508 | 510 | 511
