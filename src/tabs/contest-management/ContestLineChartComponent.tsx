import { useEffect, useState } from "react";
import LineChart from "../../common/components/line-chart";
import { monthContestData, yearContestData } from "./sampleData";
import { ContestChartProps } from "./type";
import { Select } from "antd";
import { DAILY_DATA, MONTHLY_DATA, WEEKLY_DATA, YEARLY_DATA } from "./constants";
const { Option } = Select;

const seriesData = {
    [MONTHLY_DATA]: monthContestData,
    [YEARLY_DATA]: yearContestData,
};

const LineContestChartComponent = () => {
    const [formatedData, setFormatedData] = useState<ContestChartProps>(monthContestData);
    const [activeInterval, setActiveInterval] = useState<| typeof MONTHLY_DATA | typeof YEARLY_DATA>(
        MONTHLY_DATA
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

export default LineContestChartComponent;
