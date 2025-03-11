import config from "./config.api";

const urls = {
    production: {
        authenURL: config.getAuthUrl,
        tradeURL:  config.getTradeUrl,
        userURL: 'http://127.0.0.1:8082/profile',
        stockURL: config.getStockUrl,
    },
    development: {
        authenURL: config.getAuthUrl,
        tradeURL:  config.getTradeUrl,
        userURL: 'http://127.0.0.1:8082/profile',
        stockURL: config.getStockUrl,
    },
};

const { production, development } = urls;
export const appUrls = config.isDevelopment ? development : production;
