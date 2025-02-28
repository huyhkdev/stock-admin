import api from "./axiosCustom";
import { useMutation } from "@tanstack/react-query";
import { House as HousesType } from "../@types/owner.type";

export const token = "";

export const useCreateHouse = () => {
  return useMutation({
    mutationFn: (body: HousesType) => {
      return api.post("/owner/house", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};