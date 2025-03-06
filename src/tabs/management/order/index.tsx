import { Col, Row, Space } from "antd";
import OrderListComponent from "./OrderListComponent";
import OrderLineChartComponent from "./OrderLineChartComponent";
import OrderPieChartComponent from "./OrderPieChartComponent";
import { useInfoOrders } from "../../../hook/useInfoOrders";
import { filterOrdersByKey } from "../../../utils/filterDataByProperties";

export const OrderManagement = () => {
  const { data: orders } = useInfoOrders();
//   const keysFilter = ["completed", "cancelled", "pending", "partially_filled"];
//   const dataOrdersPieChart = orders
//     ? Object.entries(filterOrdersByKey(orders, "status", )).map(
//         ([name, count]) => ({ name, count })
//       )
//     : [];
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Order Management</h1>
      <Row gutter={16}>
        <Col span={8}>
          <OrderPieChartComponent data={dataOrdersPieChart} />
        </Col>
        <Col span={16}>
          <OrderLineChartComponent />
        </Col>
      </Row>
      <OrderListComponent />
    </Space>
  );
};
