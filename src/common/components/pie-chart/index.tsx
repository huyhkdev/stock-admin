import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export interface PieChartData {
    name: string;
    value: number;
    color?: string;
}

export interface PieChartProps {
    data: PieChartData[];
    colors?: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, colors }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);

            const options: echarts.EChartOption = {
                tooltip: {
                    trigger: "item"
                },
                legend: {
                    orient: "horizontal",
                    top: "0",           
                    left: "left",     
                    itemGap: 20,        
                    itemWidth: 15,
                    itemHeight: 10,
                },
                series: [
                    {
                        name: "Data",
                        type: "pie",
                        radius: "50%",
                        data: data.map((item, index) => ({
                            ...item,
                            itemStyle: {
                                color: colors ? colors[index % colors.length] : item.color
                            }
                        })),
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
    }, [data, colors]);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default PieChart;
