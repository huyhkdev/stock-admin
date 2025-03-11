import { useQuery } from "@tanstack/react-query";
import { getAllInfoOrders, getAllInfoOrdersMatch } from "../apis/orders.api";

export const useInfoOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getAllInfoOrders,
      });
}

export const useInfoOrdersMatch = () => {
    return useQuery({
        queryKey: ["ordersMatch"],
        queryFn: getAllInfoOrdersMatch,
      });
}