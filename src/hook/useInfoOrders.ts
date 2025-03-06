import { useQuery } from "@tanstack/react-query";
import { getAllInfoOrders } from "../apis/orders.api";

export const useInfoOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getAllInfoOrders,
      });
}