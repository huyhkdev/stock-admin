import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps<T extends ApexOptions = ApexOptions> {
    formatedData: {
        options: T;
        series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    };
}

const LineChartComponent: React.FC<LineChartProps> = ({ formatedData }) => {

    return (
            <ReactApexChart
                options={formatedData.options as ApexCharts.ApexOptions}
                series={formatedData.series}
                type={formatedData.options.chart?.type}
                height={formatedData.options.chart?.height}
            />
    );
};

export default LineChartComponent;
