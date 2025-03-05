import axios, { type AxiosInstance } from "axios";

export class Api {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }

  getInstance(){
    return this.instance;
  }
  private setupInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }
}
const api = new Api().getInstance();
export default api;
