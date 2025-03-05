import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { OrderLineChartProps } from '../../../tabs/management/order/type';
import { OrderMatchChartProps } from '../../../tabs/management/matching/type';
import { ContestChartProps } from '../../../tabs/management/contest/type';

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
