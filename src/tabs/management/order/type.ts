export interface Order {
    id: string;
    email: string;
    ticker: string;
    type: "limit" | "market";
    side: "buy" | "sell";
    price: number;
    status: "pending" | "partially_filled" | "completed" | "cancelled";
    totalAmount: number;
    filledAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderLineChartProps {
    series: [
        { name: "Pending", data: number[] },
        { name: "Partially filled", data: number[] },
        { name: "Completed", data: number[] },
        { name: "Cancelled", data: number[] }
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
export interface OrderPieChartProps {
    data: {
        name: string,
        value: number;
    }[]
}