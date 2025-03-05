import { useEffect, useState } from "react";
import LineChart from "../../common/components/line-chart";
import { dayOrderData, monthOrderData, orders, weekOrderData, yearOrderData } from "./sampleData";
import { OrderLineChartProps } from "./type";
import { Select } from "antd";
import { DAILY_DATA, MONTHLY_DATA, WEEKLY_DATA, YEARLY_DATA } from "./constants";
const { Option } = Select;

const seriesData = {
    [DAILY_DATA]: dayOrderData,
    [WEEKLY_DATA]: weekOrderData,
    [MONTHLY_DATA]: monthOrderData,
    [YEARLY_DATA]: yearOrderData,
};

const LineStatusChartComponent = () => {
    const [formatedData, setFormatedData] = useState<OrderLineChartProps>(dayOrderData);
    const [activeInterval, setActiveInterval] = useState<typeof DAILY_DATA | typeof WEEKLY_DATA | typeof MONTHLY_DATA | typeof YEARLY_DATA>(
        DAILY_DATA
    );

    // Run this effect whenever activeInterval changes.
    useEffect(() => {
        console.log("activeInterval:", activeInterval);
        console.log('Updated formatedData:', seriesData[activeInterval]);
    }, [activeInterval]);

    const updateChartInterval = (interval: keyof typeof seriesData) => {
        setFormatedData({ ...seriesData[interval] });
        setActiveInterval(interval);
    };

    return (
        <div style={{ padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Select
                onChange={(value) => updateChartInterval(value as keyof typeof seriesData)}
                style={{ width: "10rem" }}
                value={activeInterval}
            >
                {Object.keys(seriesData).map((interval) => (
                    <Option key={interval} value={interval}>
                        {interval}
                    </Option>
                ))}
            </Select>
            <LineChart key={activeInterval} formatedData={formatedData} />
        </div>
    );
};

export default LineStatusChartComponent;
