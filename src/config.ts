
export const PORT = 3000;
// Base de la API (host y puerto)
export const BASE_URL = "http://localhost:" + PORT;

// Estructura de path de la API REST
export const API_SUBDOMAIN = "api";
export const APP_DOMAIN = "corazonesdev";
export const API_VERSION = "v1";

// URL completa para fetch desde cliente/test
export const apiURL = `${BASE_URL}/${API_SUBDOMAIN}/${APP_DOMAIN}/${API_VERSION}`;

// Path base que usarán los controladores en Elysia (sin host)
export const apiPath = `/${API_SUBDOMAIN}/${APP_DOMAIN}/${API_VERSION}`;

//DB URLs
export const DB = "v14";