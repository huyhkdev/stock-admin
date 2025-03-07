import { useState } from "react";
import LineChart from "../../../common/components/line-chart";
import {
  dayOrderData,
  monthOrderData,
  weekOrderData,
  yearOrderData,
} from "./sampleData";
import { OrderLineChartProps, SeriesData } from "./type";
import { Select, Spin } from "antd";
import {
  DAILY_DATA,
  MONTHLY_DATA,
  WEEKLY_DATA,
  YEARLY_DATA,
} from "./constants";
import { useInfoOrders } from "../../../hook/useInfoOrders";
import { OrderInfo } from "../../../apis/orders.api";
import { ApexOptions } from "apexcharts";
const { Option } = Select;

const seriesData = {
  [DAILY_DATA]: dayOrderData,
  [WEEKLY_DATA]: weekOrderData,
  [MONTHLY_DATA]: monthOrderData,
  [YEARLY_DATA]: yearOrderData,
};

const LineStatusChartComponent = () => {
  const { data: orders, isLoading } = useInfoOrders();

  const processOrderData = (orders: OrderInfo[]): OrderLineChartProps => {
    const dates = orders?.map(
      (order) => new Date(order.createdAt).toISOString().split("T")[0]
    );

    const uniqueDates = [...new Set(dates)].sort();
    console.log(uniqueDates);
    if (uniqueDates.length === 0) {
      return {
        series: [
          { name: "Pending", data: [] },
          { name: "Partially filled", data: [] },
          { name: "Completed", data: [] },
          { name: "Cancelled", data: [] },
        ],
        options: {
          chart: { height: 350, type: "area", toolbar: { show: false } },
          markers: { size: 4 },
          colors: ["#39afd1", "#f77e53", "#fcb92c", "#e3eaef"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.4,
              stops: [0, 90, 100],
            },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth", width: 2 },
          xaxis: { type: "datetime", categories: [] },
          tooltip: { x: { format: "dd/MM/yy HH:mm" } },
        },
      };
    }

    const statusData: { [key: string]: number[] } = {
      Pending: new Array(uniqueDates.length).fill(0),
      "Partially filled": new Array(uniqueDates.length).fill(0),
      Completed: new Array(uniqueDates.length).fill(0),
      Cancelled: new Array(uniqueDates.length).fill(0),
    };

    orders?.forEach((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      const dateIndex = uniqueDates.indexOf(orderDate);

      if (dateIndex !== -1) {
        const statusKey =
          order.status === "partially_filled"
            ? "Partially filled"
            : order.status.charAt(0).toUpperCase() + order.status.slice(1);
        statusData[statusKey][dateIndex]++;
      }
    });

    const series: SeriesData[] = [
      { name: "Pending", data: statusData["Pending"] },
      { name: "Partially filled", data: statusData["Partially filled"] },
      { name: "Completed", data: statusData["Completed"] },
      { name: "Cancelled", data: statusData["Cancelled"] },
    ];

    const categories = uniqueDates.map((date) => `${date}T00:00:00Z`);
    const options: ApexOptions = {
      chart: {
        height: 350,
        type: "area",
        toolbar: { show: false },
      },
      markers: { size: 4 },
      colors: ["#ff9800", "#2196f3", "#4caf50", "#f44336"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: {
        type: "datetime",
        categories: categories,
      },
      tooltip: {
        x: { format: "dd/MM/yy HH:mm" },
      },
    };

    return { series, options };
  };
  const chartData = processOrderData(orders as OrderInfo[]);

  const [formatedData, setFormatedData] =
    useState<OrderLineChartProps>(chartData);
  const [activeInterval, setActiveInterval] = useState<
    | typeof DAILY_DATA
    | typeof WEEKLY_DATA
    | typeof MONTHLY_DATA
    | typeof YEARLY_DATA
  >(DAILY_DATA);

  const updateChartInterval = (interval: keyof typeof seriesData) => {
    setFormatedData({ ...seriesData[interval] });
    setActiveInterval(interval);
  };

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Select
        onChange={(value) =>
          updateChartInterval(value as keyof typeof seriesData)
        }
        style={{ width: "10rem" }}
        value={activeInterval}
      >
        {Object.keys(seriesData).map((interval) => (
          <Option key={interval} value={interval}>
            {interval}
          </Option>
        ))}
      </Select>
      <Spin spinning={isLoading}>
        {!isLoading && (
          <LineChart key={activeInterval} formatedData={chartData} />
        )}
      </Spin>
    </div>
  );
};

export default LineStatusChartComponent;
