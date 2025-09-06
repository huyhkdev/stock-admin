import api from "./axiosCustom";
import { appUrls } from "./contants";

export type BannerStatus = "active" | "inactive" | "expired";

export interface BannerEvent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  status: BannerStatus;
  startTime: Date;
  endTime: Date;
  linkUrl: string;
  priority: number;
}

export const getAllBannerEvents = async (): Promise<BannerEvent[]> => {
  const response = await api.get(`${appUrls.tradeURL}/admin/banners`);
  return response.data.data;
};

export const getBannerEventById = async (id: number): Promise<BannerEvent> => {
  const response = await api.get(`${appUrls.tradeURL}/admin/banners/${id}`);
  return response.data.data;
};

export const createBannerEvent = async (
  contest: FormData
): Promise<BannerEvent> => {
  const response = await api.post(
    `${appUrls.tradeURL}/admin/banners`,
    contest,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
};

export const updateBannerEvent = async (
  id: number,
  formData: FormData
): Promise<BannerEvent> => {
  const res = await api.put(
    `${appUrls.tradeURL}/admin/banners/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data.data;
};

export const deleteBannerEvent = async (id: number): Promise<boolean> => {
  const response = await api.delete(`${appUrls.tradeURL}/admin/banners/${id}`);
  return response.data.data;
};