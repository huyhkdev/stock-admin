import { Col, Row, Space } from "antd";
import OrderListComponent from "./OrderListComponent";
import OrderLineChartComponent from "./OrderLineChartComponent";
import OrderPieChartComponent from "./OrderPieChartComponent";

export const OrderManagement = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Order Management</h1>
            <Row gutter={16}>
                <Col span={8}>
                    <OrderPieChartComponent />
                </Col>
                <Col span={16}>
                    <OrderLineChartComponent />
                </Col>
            </Row>
            <OrderListComponent />
        </Space>
    );
};
