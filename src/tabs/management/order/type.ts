import { ApexOptions } from "apexcharts";
import { OrderStatusType } from "../../../apis/orders.api";

export interface Order {
  id: string;
  email: string;
  ticker: string;
  type: "limit" | "market";
  side: "buy" | "sell";
  price: number;
  status: OrderStatusType;
  totalAmount: number;
  filledAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface SeriesData {
  name: string;
  data: number[];
}

export interface OrderLineChartProps {
  series: SeriesData[];
  options: ApexOptions;
}
export interface OrderPieChartProps {
  data: {
    name: string;
    value: number;
  }[];
}
