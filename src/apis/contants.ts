import config from "./config.api";

const urls = {
    production: {
        authenURL: config.getAuthUrl,
        tradeURL:  'http://localhost:4000/api',
        userURL: 'http://127.0.0.1:8082/profile',
    },
    development: {
        authenURL: config.getAuthUrl,
        tradeURL:  'http://localhost:4000/api',
        userURL: 'http://127.0.0.1:8082/profile',
    },
};

const { production, development } = urls;
export const appUrls = config.isDevelopment ? development : production;
