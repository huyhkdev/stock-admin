
import { Contest, ContestParticipant, TopUser } from "../../../apis/contests.api";

export interface ContestDetailProps {
    contests: Contest[];
    loading: boolean;
}
export interface ParticipantListComponentProps {
    participants: ContestParticipant[];
    loading: boolean;
}
export interface RankListComponentProps {
    topUsers: TopUser[];
    loading: boolean;
}

export interface ContestChartProps {
    series: [
        { name: "Contest", data: number[] },
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
        colors: string[];
        fill: {
            type: "gradient";
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
            type: "datetime" | "category" | "numeric" | undefined; // ✅ Đúng kiểu dữ liệu của ApexCharts
            categories: string[];
        },
        tooltip: {
            x: {
                format: string;
            }
        }
    }
}

