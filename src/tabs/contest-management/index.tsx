import { Space } from "antd";
import ContestListComponent from "./ContestListComponent";
import ContestLineChartComponent from "./ContestLineChartComponent";
const ContestManagement = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Contest Management</h1>
            <ContestLineChartComponent />
            <ContestListComponent />
        </Space>
    );
};
export default ContestManagement;