import { Space } from "antd";
import MatchingListComponent from "./MatchingListComponent";
import MatchingLineChartComponent from "./MatchingLineChartComponent";

export const MatchingManagement = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Matching Management</h1>
            <MatchingLineChartComponent />
            <MatchingListComponent />
        </Space>
    );
};