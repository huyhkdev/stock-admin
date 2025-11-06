import { useQuery } from "@tanstack/react-query";
import { getAllInfoOrders, getAllInfoOrdersMatch, MatchDateRange, OrderListResponse, OrderMarketType, OrderSideType, OrderStatusType, OrderMatchSortBy, OrderMatchSortOrder } from "../apis/orders.api";

export const useInfoOrders = (params?: { page?: number; limit?: number; side?: OrderSideType; type?: OrderMarketType; status?: OrderStatusType; search?: string }) => {
    return useQuery<OrderListResponse>({
        queryKey: ["orders", params?.page ?? 1, params?.limit ?? 10, params?.side, params?.type, params?.status, params?.search],
        queryFn: () => getAllInfoOrders(params),
      });
}

export const useInfoOrdersMatch = (params?: { page?: number; limit?: number; searchUid?: string; dateRange?: MatchDateRange; sortBy?: OrderMatchSortBy; sortOrder?: OrderMatchSortOrder }) => {
  return useQuery({
    queryKey: [
      "ordersMatch",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.searchUid ?? "",
      params?.dateRange ?? "all",
      params?.sortBy ?? "createdAt",
      params?.sortOrder ?? "desc",
    ],
    queryFn: () => getAllInfoOrdersMatch(params),
  });
}