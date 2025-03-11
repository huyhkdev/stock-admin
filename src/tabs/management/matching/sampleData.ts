import { OrderMatchChartProps } from "./type";

export const dayOrderData: OrderMatchChartProps = {
    series: [
        { name: "Order sell match", data: [22, 11, 23, 44, 23, 11, 54, 13, 43, 10, 12, 56] },
        { name: "Order buy match", data: [41, 67, 22, 43, 22, 44, 55, 67, 21, 22, 67, 21] },
        { name: 'Order not match', data: [63, 78, 45, 87, 45, 55, 67, 80, 64, 32, 79, 77] }
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
                "2025-02-19T00:00:00Z",
                "2025-02-20T00:00:00Z",
                "2025-02-21T00:00:00Z",
                "2025-02-22T00:00:00Z",
                "2025-02-23T00:00:00Z",
                "2025-02-24T00:00:00Z",
                "2025-02-25T00:00:00Z",
                "2025-02-26T00:00:00Z",
                "2025-02-27T00:00:00Z",
                "2025-02-28T00:00:00Z",
                "2025-03-01T00:00:00Z",
                "2025-03-02T00:00:00Z"
            ]
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        }
    }
};
export const weekOrderData: OrderMatchChartProps = {
    series: [
        { name: "Order sell match", data: [22, 11, 23, 44, 23, 11,] },
        { name: "Order buy match", data: [41, 67, 22, 43, 22, 44] },
        { name: 'Order not match', data: [63, 78, 45, 87, 45, 55] }
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
                "2025-01-20T00:00:00Z",
                "2025-01-27T00:00:00Z",
                "2025-02-03T00:00:00Z",
                "2025-02-10T00:00:00Z",
                "2025-02-17T00:00:00Z",
                "2025-02-24T00:00:00Z",
            ]
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm"
            }
        }
    }
};
export const monthOrderData: OrderMatchChartProps = {
    series: [
        { name: "Order sell match", data: [23, 11, 54, 13, 43, 22, 11, 23, 44, 10, 12, 56] },
        { name: "Order buy match", data: [44, 55, 41, 67, 22, 43, 22, 67, 21, 22, 67, 21] },
        { name: 'Order not match', data: [63, 78, 45, 87, 45, 55, 41, 67, 22, 43, 22, 44] }
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
export const yearOrderData: OrderMatchChartProps = {
    series: [
        { name: "Order sell match", data: [22, 11, 23, 44, 23, 11,] },
        { name: "Order buy match", data: [41, 67, 22, 43, 22, 44] },
        { name: 'Order not match', data: [11, 23, 44, 67, 22, 43] }
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