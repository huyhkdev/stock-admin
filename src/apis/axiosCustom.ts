import axios, { type AxiosInstance } from "axios";
import { developmentURL, paymentURL, productionURL } from "./contants";
// const baseURL =
//   process.env.NODE_ENV === "development" ? developmentURL : productionURL;
const baseURL = paymentURL;
export class Api {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getInstance(){
    return this.instance;
  }

}
const api = new Api().getInstance();
export default api;
