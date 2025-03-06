import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export interface PieChartData {
    name: string;
    value: number;
}

export interface PieChartProps {
    data: PieChartData[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);

            const options = {
                tooltip: {
                    trigger: "item"
                },
                legend: {
                    orient: "horizontal", // display legends in a row
                    top: "0",            // position at the very top
                    left: "left",      // center horizontally
                    itemGap: 20,         // gap between legend items
                    // Optionally, you can adjust itemWidth and itemHeight
                    itemWidth: 15,
                    itemHeight: 10,
                },
                series: [
                    {
                        name: "Data",
                        type: "pie",
                        radius: "50%",
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };

            chartInstance.setOption(options);

            const handleResize = () => {
                chartInstance.resize();
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                chartInstance.dispose();
            };
        }
    }, [data]);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default PieChart;
