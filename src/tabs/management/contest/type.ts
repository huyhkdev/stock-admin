import { ApexOptions } from "apexcharts";

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

export interface ContestChartProps<T extends ApexOptions = ApexOptions> {
    options: T;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
}