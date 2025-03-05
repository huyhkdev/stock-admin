export interface Match {
    id: string;
    orderBuyId: string;
    orderSellId: string;
    incomingOrderId: string;
    amount: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderMatchChartProps {
    series: [
        { name: "Order sell match", data: number[] },
        { name: "Order buy match", data: number[] },
        { name: "Order not match", data: number[] },
    ],
    options: {
        chart: {
            height: number;
            type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
            toolbar: {
                show: boolean;
            }
        },
        markers: {
            size: number;
        },
        colors: string[],
        fill: {
            type: "datetime" | "category" | "numeric" | undefined;
            gradient: {
                shadeIntensity: number;
                opacityFrom: number;
                opacityTo: number;
                stops: number[];
            }
        },
        dataLabels: {
            enabled: boolean;
        },
        stroke: {
            curve: "smooth" | "straight" | "stepline" | "linestep" | "monotoneCubic";
            width: number;
        },
        xaxis: {
            type: string;
            categories: string[];
        },
        tooltip: {
            x: {
                format: string;
            }
        }
    }
}