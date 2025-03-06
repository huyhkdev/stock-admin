import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface OrderInfo {
  id: string,
  fullname: string,
  email: string,
  role: string,
  cic: string,
  gender: string,
  dob: Date,
  campus: string,
  state: string,
  createdAt: Date,
  updatedAt: Date,
  balance: number;
}

export const getAllInfoOrders = async (): Promise<OrderInfo[]> => {
  const response = await api.get(`${appUrls.tradeURL}/admin/open-order`);
  return response.data.data;
};
