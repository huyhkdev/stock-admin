import { Order, OrderLineChartProps, OrderPieChartProps } from "./type";

export const dayData: Array<{ time: string; customValues: Record<string, number> }> = [
    {
        time: '2018-10-19',
        customValues: {
            "Trọ A": 26.19,
            "Trọ B": 25.5,
            "Trọ C": 24.89,
        },
    },
    {
        time: '2018-10-22',
        customValues: {
            "Trọ A": 25.87,
            "Trọ B": 25.3,
            "Trọ C": 25.1,
        },
    },
    {
        time: '2018-10-23',
        customValues: {
            "Trọ A": 25.83,
            "Trọ B": 25.6,
            "Trọ C": 25.2,
        },
    },
    {
        time: '2018-10-24',
        customValues: {
            "Trọ A": 25.78,
            "Trọ B": 25.5,
            "Trọ C": 25.0,
        },
    },
];

export const weekData: Array<{ time: string; customValues: Record<string, number> }> = [
    {
        time: '2016-07-18',
        customValues: {
            "Trọ A": 26.1,
            "Trọ B": 26.2,
            "Trọ C": 25.8,
        },
    },
    {
        time: '2016-07-25',
        customValues: {
            "Trọ A": 26.19,
            "Trọ B": 26.15,
            "Trọ C": 25.9,
        },
    },
    {
        time: '2016-08-01',
        customValues: {
            "Trọ A": 26.24,
            "Trọ B": 26.3,
            "Trọ C": 26.1,
        },
    },
    {
        time: '2016-08-08',
        customValues: {
            "Trọ A": 26.22,
            "Trọ B": 26.18,
            "Trọ C": 26.0,
        },
    },
];

export const monthData: Array<{ time: string; customValues: Record<string, number> }> = [
    {
        time: '2006-12-01',
        customValues: {
            "Trọ A": 25.4,
            "Trọ B": 25.3,
            "Trọ C": 25.0,
        },
    },
    {
        time: '2007-01-01',
        customValues: {
            "Trọ A": 25.5,
            "Trọ B": 25.6,
            "Trọ C": 25.2,
        },
    },
    {
        time: '2007-02-01',
        customValues: {
            "Trọ A": 25.11,
            "Trọ B": 25.2,
            "Trọ C": 24.9,
        },
    },
    {
        time: '2007-03-01',
        customValues: {
            "Trọ A": 25.24,
            "Trọ B": 25.3,
            "Trọ C": 25.1,
        },
    },
];

export const yearData: Array<{ time: string; customValues: Record<string, number> }> = [
    {
        time: '2006-01-02',
        customValues: {
            "Trọ A": 5,
            "Trọ B": 10,
            "Trọ C": 15,
        },
    },
    {
        time: '2007-01-01',
        customValues: {
            "Trọ A": 6,
            "Trọ B": 11,
            "Trọ C": 16,
        },
    },
    {
        time: '2008-01-01',
        customValues: {
            "Trọ A": 7,
            "Trọ B": 12,
            "Trọ C": 17,
        },
    },
    {
        time: '2009-01-01',
        customValues: {
            "Trọ A": 8,
            "Trọ B": 13,
            "Trọ C": 18,
        },
    },
    {
        time: '2010-01-01',
        customValues: {
            "Trọ A": 9,
            "Trọ B": 14,
            "Trọ C": 19,
        },
    },
    {
        time: '2011-01-03',
        customValues: {
            "Trọ A": 10,
            "Trọ B": 15,
            "Trọ C": 20,
        },
    },
    {
        time: '2012-01-02',
        customValues: {
            "Trọ A": 11,
            "Trọ B": 16,
            "Trọ C": 21,
        },
    },
    {
        time: '2013-01-01',
        customValues: {
            "Trọ A": 12,
            "Trọ B": 17,
            "Trọ C": 22,
        },
    },
    {
        time: '2014-01-01',
        customValues: {
            "Trọ A": 13,
            "Trọ B": 18,
            "Trọ C": 23,
        },
    },
    {
        time: '2015-01-01',
        customValues: {
            "Trọ A": 14,
            "Trọ B": 19,
            "Trọ C": 24,
        },
    },
    {
        time: '2016-01-01',
        customValues: {
            "Trọ A": 15,
            "Trọ B": 20,
            "Trọ C": 25,
        },
    },
    {
        time: '2017-01-02',
        customValues: {
            "Trọ A": 16,
            "Trọ B": 21,
            "Trọ C": 26,
        },
    },
    {
        time: '2018-01-01',
        customValues: {
            "Trọ A": 17,
            "Trọ B": 22,
            "Trọ C": 0,
        },
    },
    {
        time: '2019-01-01',
        customValues: {
            "Trọ A": 18,
            "Trọ B": 23,
            "Trọ C": 28,
        },
    },
];

export const orders: Order[] = [
    {
        id: "order128",
        email: "clara.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "buy",
        price: 133600.00,
        status: "partially_filled",
        totalAmount: 100.00,
        filledAmount: 13.00,
        createdAt: new Date("2025-02-18T19:47:02Z"),
        updatedAt: new Date("2025-02-26T13:59:56Z")
    },
    {
        id: "order129",
        email: "clara.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 153600.00,
        status: "completed",
        totalAmount: 100.00,
        filledAmount: 100.00,
        createdAt: new Date("2025-02-18T19:47:17Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order130",
        email: "claria.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 153600.00,
        status: "completed",
        totalAmount: 200.00,
        filledAmount: 200.00,
        createdAt: new Date("2025-02-18T20:12:21Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order131",
        email: "sarah.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "buy",
        price: 153600.00,
        status: "completed",
        totalAmount: 200.00,
        filledAmount: 200.00,
        createdAt: new Date("2025-02-19T08:55:41Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order132",
        email: "sam.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "buy",
        price: 133900.00,
        status: "completed",
        totalAmount: 200.00,
        filledAmount: 200.00,
        createdAt: new Date("2025-02-19T08:56:40Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order133",
        email: "han.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "buy",
        price: 133900.00,
        status: "completed",
        totalAmount: 200.00,
        filledAmount: 200.00,
        createdAt: new Date("2025-02-19T08:56:53Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order134",
        email: "solie.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 153000.00,
        status: "completed",
        totalAmount: 100.00,
        filledAmount: 100.00,
        createdAt: new Date("2025-02-22T12:08:44Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order135",
        email: "sa.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 143000.00,
        status: "completed",
        totalAmount: 200.00,
        filledAmount: 200.00,
        createdAt: new Date("2025-02-22T12:08:57Z"),
        updatedAt: new Date("2025-02-25T12:07:19Z")
    },
    {
        id: "order136",
        email: "sa.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 153000.00,
        status: "pending",
        totalAmount: 500.00,
        filledAmount: 0.00,
        createdAt: new Date("2025-02-22T16:53:19Z"),
        updatedAt: new Date("2025-03-01T11:01:05Z")
    },
    {
        id: "order137",
        email: "sa.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 153000.00,
        status: "cancelled",
        totalAmount: 200.00,
        filledAmount: 0.00,
        createdAt: new Date("2025-02-22T21:13:52Z"),
        updatedAt: new Date("2025-02-26T12:07:19Z")
    },
    {
        id: "order138",
        email: "sa.le@example.com",
        ticker: "FPT",
        type: "market",
        side: "sell",
        price: 133000.00,
        status: "completed",
        totalAmount: 100.00,
        filledAmount: 100.00,
        createdAt: new Date("2025-02-22T21:15:03Z"),
        updatedAt: new Date("2025-02-22T21:15:03Z")
    },
    {
        id: "order123",
        email: "sa.le@example.com",
        ticker: "FPT",
        type: "limit",
        side: "sell",
        price: 133000.00,
        status: "completed",
        totalAmount: 100.00,
        filledAmount: 100.00,
        createdAt: new Date("2025-02-22T21:15:03Z"),
        updatedAt: new Date("2025-02-22T21:15:03Z")
    }
];

export const dayOrderData: OrderLineChartProps = {
    series: [
        { name: "Pending", data: [22, 11, 23, 44, 23, 11, 54, 13, 43, 10, 12, 56] },
        { name: "Partially filled", data: [41, 67, 22, 43, 22, 44, 55, 67, 21, 22, 67, 21] },
        { name: "Completed", data: [31, 41, 22, 22, 31, 22, 34, 54, 34, 41, 67, 21] },
        { name: "Cancelled", data: [31, 54, 34, 41, 22, 31, 41, 22, 34, 54, 34, 41] }
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
            },
        }
    }
};
export const weekOrderData: OrderLineChartProps = {
    series: [
        { name: "Pending", data: [22, 11, 23, 44, 23, 11,] },
        { name: "Partially filled", data: [41, 67, 22, 43, 22, 44] },
        { name: "Completed", data: [31, 41, 22, 22, 31, 22] },
        { name: "Cancelled", data: [31, 54, 34, 41, 22, 31] }
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
export const monthOrderData: OrderLineChartProps = {
    series: [
        { name: "Pending", data: [23, 11, 54, 13, 43, 22, 11, 23, 44, 10, 12, 56] },
        { name: "Partially filled", data: [44, 55, 41, 67, 22, 43, 22, 67, 21, 22, 67, 21] },
        { name: "Completed", data: [31, 41, 22, 34, 54, 34, 41, 22, 31, 22, 67, 21] },
        { name: "Cancelled", data: [31, 41, 22, 34, 54, 34, 41, 22, 31, 54, 34, 41] }
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
export const yearOrderData: OrderLineChartProps = {
    series: [
        { name: "Pending", data: [22, 11, 23, 44, 23, 11,] },
        { name: "Partially filled", data: [41, 67, 22, 43, 22, 44] },
        { name: "Completed", data: [31, 41, 22, 22, 31, 22] },
        { name: "Cancelled", data: [31, 54, 34, 41, 22, 31] }
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
export const pieOrderData: OrderPieChartProps = {
    data: [
        { name: 'Pending', value: 30 },
        { name: 'Partially filled', value: 20 },
        { name: 'Completed', value: 15 },
        { name: 'Cancelled', value: 35 },
    ]
}
