const urls = {
    production: {
        socketDataURL: 'ws://127.0.0.1:8765',
        socketOrderURL: 'ws://localhost:4000',
        authenURL: process.env.REACT_APP_AUTHEN_URL,
        stockURL: 'http://localhost:5050/api/data',
        tradeURL:  'http://localhost:4000/api',
        userURL: 'http://127.0.0.1:8082/profile',
    },
    development: {
        socketDataURL: 'ws://127.0.0.1:8765',
        socketOrderURL:  'ws://localhost:4000',
        authenURL: process.env.REACT_APP_AUTHEN_URL,
        stockURL: 'http://localhost:5050/api/data',
        tradeURL:  'http://localhost:4000/api',
        userURL: 'http://127.0.0.1:8082/profile',
    },
};

const isDev = process.env.NODE_ENV === 'development';
const { production, development } = urls;
export const appUrls = isDev ? development : production;
