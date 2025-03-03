// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// const PieChartComponent = () => {
//     return (
//         <div style={{ width: '100%', height: 300 }}>
//             <ResponsiveContainer >
//                 <PieChart width={400} height={400}>
//                     <Pie
//                         data={data}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={renderCustomizedLabel}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                     >
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }
// export default PieChartComponent;

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
                    trigger: "item" as "item"
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
