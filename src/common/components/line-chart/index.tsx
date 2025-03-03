import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { OrderLineChartProps } from '../../../tabs/order-management/type';
import { OrderMatchChartProps } from '../../../tabs/matching-management/type';
import { ContestChartProps } from '../../../tabs/contest-management/type';

interface LineChartProps {
    formatedData: OrderLineChartProps | OrderMatchChartProps | ContestChartProps;
}

const LineChartComponent: React.FC<LineChartProps> = ({ formatedData }) => {
    const [data, setData] = React.useState<OrderLineChartProps | OrderMatchChartProps | ContestChartProps>(formatedData);
    useEffect(() => {
        console.log("Updated formatedData nnn:", formatedData);
    }, []);

    return (
        <div>
            <ReactApexChart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={data.options.chart.height}
            />
        </div>
    );
};

export default LineChartComponent;
