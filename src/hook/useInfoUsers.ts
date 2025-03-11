import { useQuery } from "@tanstack/react-query";
import {
  getAllInfoUsers,
  getAllUserAssets,
  getUserAssets,
} from "../apis/users.api";

export const useInfoUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllInfoUsers,
  });
};

export const useInfoAssetsUser = (uid: string) => {
  return useQuery({
    queryKey: ["assets", uid],
    queryFn: () => getUserAssets(uid!),
    enabled: !!uid,
  });
};

export const useInfoAllAssetsUser = () => {
  return useQuery({
    queryKey: ["allAssets"],
    queryFn: () => getAllUserAssets(),
  });
};
