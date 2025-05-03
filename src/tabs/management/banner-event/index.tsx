import { Space } from "antd";
import BannerEventListComponent from "./BannerEventListComponent";
import { useInfoBannerEvents } from "../../../hook/useInfoBannerEvent";

export const BannerEventManagement = () => {
  const { data: banners, isLoading: loading } = useInfoBannerEvents();

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Banner Event Management</h1>
      <BannerEventListComponent banners={banners || []} loading={loading} />
    </Space>
  );
};
