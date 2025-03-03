export interface Contest {
    contestId: string;
    contestName: string;
    startDateTime: Date;
    endDateTime: Date;
}

export interface ContestParticipant {
    contestId: string,
    userName: string,
    initialBalance: number,
    finalBalance: number,
}
export interface ContestDetailProps {
    contest: Contest | null;
}
export interface ParticipantListComponentProps {
    participants: ContestParticipant[];
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