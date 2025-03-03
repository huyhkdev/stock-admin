import { Contest, ContestChartProps, ContestParticipant } from "./type";

// Sample data for Contest model
export const contests: Contest[] = [
    {
        contestId: "contest1",
        contestName: "Summer Challenge",
        startDateTime: new Date("2025-06-01T00:00:00Z"),
        endDateTime: new Date("2025-06-30T23:59:59Z"),
    },
    {
        contestId: "contest2",
        contestName: "Winter Challenge",
        startDateTime: new Date("2025-12-01T00:00:00Z"),
        endDateTime: new Date("2025-12-31T23:59:59Z"),
    },
];

// Sample data for ContestParticipant model
export const contestParticipants: ContestParticipant[] = [
    {
        contestId: "contest1",
        userName: "user123",
        initialBalance: 1000,
        finalBalance: 1200,
    },
    {
        contestId: "contest1",
        userName: "user444",
        initialBalance: 1360,
        finalBalance: 1380,
    },
    {
        contestId: "contest1",
        userName: "user456",
        initialBalance: 1160,
        finalBalance: 900,
    },
    {
        contestId: "contest1",
        userName: "user163",
        initialBalance: 1000,
        finalBalance: 1580,
    },
    {
        contestId: "contest1",
        userName: "user123",
        initialBalance: 1370,
        finalBalance: 1500,
    },
    {
        contestId: "contest1",
        userName: "user223",
        initialBalance: 1000,
        finalBalance: 1480,
    },
    {
        contestId: "contest1",
        userName: "user113",
        initialBalance: 1140,
        finalBalance: 1490,
    },
    {
        contestId: "contest2",
        userName: "user789",
        initialBalance: 940,
        finalBalance: 1200,
    },
    {
        contestId: "contest2",
        userName: "user101",
        initialBalance: 929,
        finalBalance: 1100,
    },
    {
        contestId: "contest2",
        userName: "user789",
        initialBalance: 880,
        finalBalance: 1200,
    },
    {
        contestId: "contest2",
        userName: "user199",
        initialBalance: 1000,
        finalBalance: 1100,
    },
    {
        contestId: "contest2",
        userName: "user719",
        initialBalance: 1000,
        finalBalance: 1200,
    },
    {
        contestId: "contest2",
        userName: "user141",
        initialBalance: 1000,
        finalBalance: 1100,
    },
    {
        contestId: "contest2",
        userName: "user784",
        initialBalance: 1000,
        finalBalance: 1200,
    },
    {
        contestId: "contest2",
        userName: "user111",
        initialBalance: 1000,
        finalBalance: 1100,
    },
];


export const monthContestData: ContestChartProps = {
    series: [
        { name: "Contest", data: [23, 11, 54, 13, 43, 22, 11, 23, 44, 10, 12, 56] },
    ],
    options: {
        chart: {
            height: 350,
            type: "area",
            toolbar: {
                show: false
            }
        },
        markers: {
            size: 4,
        },
        colors: ["#39afd1", "#f77e53", "#fcb92c", "#e3eaef"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2025-01-01T00:00:00Z",
                "2025-02-01T00:00:00Z",
                "2025-03-01T00:00:00Z",
                "2025-04-01T00:00:00Z",
                "2025-05-01T00:00:00Z",
                "2025-06-01T00:00:00Z",
                "2025-07-01T00:00:00Z",
                "2025-08-01T00:00:00Z",
                "2025-09-01T00:00:00Z",
                "2025-10-01T00:00:00Z",
                "2025-11-01T00:00:00Z",
                "2025-12-01T00:00:00Z"
            ]
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        }
    }
};
export const yearContestData: ContestChartProps = {
    series: [
        { name: "Contest", data: [22, 11, 23, 44, 23, 11,] },
    ],
    options: {
        chart: {
            height: 350,
            type: "area",
            toolbar: {
                show: false
            }
        },
        markers: {
            size: 4,
        },
        colors: ["#39afd1", "#f77e53", "#fcb92c", "#e3eaef"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2020-01-01T00:00:00Z",
                "2021-01-01T00:00:00Z",
                "2022-01-01T00:00:00Z",
                "2023-01-01T00:00:00Z",
                "2024-01-01T00:00:00Z",
                "2025-01-01T00:00:00Z",
            ]
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        }
    }
};