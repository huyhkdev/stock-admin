import api from "./axiosCustom";
import { appUrls } from "./contants";

export type OrderMarketType = "limit" | "market";

export type OrderSideType = "buy" | "sell";

export type OrderStatusType =
  | "pending"
  | "partially_filled"
  | "completed"
  | "cancelled";

export interface OrderInfo {
  id: string;
  email: string;
  ticker: string;
  type: OrderMarketType;
  price: number;
  side: OrderSideType;
  status: OrderStatusType;
  totalAmount: number;
  filledAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllInfoOrders = async (): Promise<OrderInfo[]> => {
  const response = await api.get(`${appUrls.tradeURL}/admin/open-order`);
  return response.data.data;
};
