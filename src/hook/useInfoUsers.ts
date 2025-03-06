import { useQuery } from "@tanstack/react-query";
import { getAllInfoUsers } from "../apis/users.api";

export const useInfoUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAllInfoUsers,
      });
}