import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBannerEvent,
  deleteBannerEvent,
  getAllBannerEvents,
  updateBannerEvent,
} from "../apis/banners.api";

export const useInfoBannerEvents = () => {
  return useQuery({
    queryKey: ["bannerEvents"],
    queryFn: () => getAllBannerEvents(),
  });
};

export const useCreateBannerEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBannerEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerEvents"] });
    },
  });
};

export const useUpdateBannerEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateBannerEvent(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerEvents"] });
    },
  });
};

export const useDeleteBannerEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBannerEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bannerEvents"] });
    },
  });
};
