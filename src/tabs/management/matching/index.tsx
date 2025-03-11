import { Space } from "antd";
import MatchingListComponent from "./MatchingListComponent";
import MatchingLineChartComponent from "./MatchingLineChartComponent";
import { useInfoOrdersMatch } from "../../../hook/useInfoOrders";
import { OrderMatch } from "../../../apis/orders.api";
import { formatIdOrder } from "../../../utils";

export const MatchingManagement = () => {
  const { data, isLoading } = useInfoOrdersMatch();
  const dataOrderMatchList: OrderMatch[] = data
    ? data?.map((order) => {
        return {
          ...order,
          id: formatIdOrder(order.id, "m"),
          key: formatIdOrder(order.id, "m"),
        };
      })
    : [];
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Matching Management</h1>
      <MatchingLineChartComponent
        data={dataOrderMatchList}
        loading={isLoading}
      />
      <MatchingListComponent data={dataOrderMatchList} loading={isLoading} />
    </Space>
  );
};
