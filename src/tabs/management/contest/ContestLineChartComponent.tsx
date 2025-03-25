import { useEffect, useState } from "react";
import LineChart from "../../../common/components/line-chart";
import { ContestChartProps, ContestDetailProps } from "./type";
import { Select, Skeleton } from "antd";
import { MONTHLY_DATA, YEARLY_DATA } from "./constants";
import { filterContestByInterval } from "../../../utils";

const { Option } = Select;
const LineContestChartComponent:React.FC<ContestDetailProps> = (props) => {
    const { contests, loading } = props;
    const [activeInterval, setActiveInterval] = useState<typeof MONTHLY_DATA | typeof YEARLY_DATA>(MONTHLY_DATA);
    const [formatedData, setFormatedData] = useState<ContestChartProps | null>(null);

    useEffect(() => {
        if (!loading && contests) {
            const contestData = filterContestByInterval(contests, activeInterval);

            setFormatedData({
                series: [{ name: "Contest", data: contestData.data }],
                options: {
                    chart: { height: 350, type: "area", toolbar: { show: false } },
                    markers: { size: 4 },
                    colors: ["#39afd1"],
                    fill: {
                        type: "gradient",
                        gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.4, stops: [0, 90, 100] },
                    },
                    dataLabels: { enabled: false },
                    stroke: { curve: "smooth", width: 2 },
                    xaxis: { type: "datetime", categories: contestData.categories },
                    tooltip: { x: { format: activeInterval === YEARLY_DATA ? "yyyy" : "yyyy-MM-dd" } },
                },
            });
        }
    }, [activeInterval, contests, loading]);

    return (
        <div style={{ padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            {loading ? (
               <Skeleton active />
            ) : (
                <>
                    <Select
                        onChange={(value) => setActiveInterval(value as typeof MONTHLY_DATA | typeof YEARLY_DATA)}
                        style={{ width: "10rem", marginBottom: "1rem" }}
                        value={activeInterval}
                    >
                        <Option value={MONTHLY_DATA}>{MONTHLY_DATA}</Option>
                        <Option value={YEARLY_DATA}>{YEARLY_DATA}</Option>
                    </Select>

                        {formatedData && <LineChart key={activeInterval} formatedData={formatedData} />}
                </>
            )}
        </div>
    );
};

export default LineContestChartComponent;
