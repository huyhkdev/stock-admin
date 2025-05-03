import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBannerEvent, getAllBannerEvents } from "../apis/banners.api";

export const useInfoBannerEvents = () => {
    return useQuery({
        queryKey: ["bannerEvents"],
        queryFn: ()=>getAllBannerEvents(),
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
