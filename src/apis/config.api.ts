import { ENV } from "../@types/config.interface";

class ConfigService {
  private _getEnv(key: keyof ENV): string {
    if (!import.meta.env[key]) {
      throw new Error(key + " environment variable does not set");
    }
    return import.meta.env[key]!;
  }

  get isProduction(): boolean {
    return this._getEnv("VITE_NODE_ENV") === "production";
  }

  get isDevelopment(): boolean {
    return this._getEnv("VITE_NODE_ENV") === "development";
  }

  get contextPath(): string {
    return this._getEnv("VITE_CONTEXT_PATH");
  }

  get portServer(): number {
    return Number.parseInt(this._getEnv("VITE_PORT"));
  }

  get hostServer(): string {
    return this._getEnv("VITE_HOST");
  }

  get getAuthUrl(): string {
    return this._getEnv("VITE_AUTHEN_API_URL");
  }
}
const config = new ConfigService();
export default config;
