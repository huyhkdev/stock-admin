import { Col, Flex, Row, Space } from "antd";
import MatchingListComponent from "./MatchingListComponent";
import MatchingLineChartComponent from "./MatchingLineChartComponent";
const MatchingManagement = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Matching Management</h1>
            <MatchingLineChartComponent />
            <MatchingListComponent />
        </Space>
    );
};
export default MatchingManagement;