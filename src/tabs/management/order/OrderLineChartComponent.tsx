import { useEffect, useState } from "react";
import LineChart from "../../../common/components/line-chart";
import { IntervalType, OrderLineChartProps, SeriesData } from "./type";
import { Select, Spin, DatePicker } from "antd";
import { DAILY_DATA, intervalMapping } from "./constants";
import { OrderInfo } from "../../../apis/orders.api";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { filterOrdersByInterval } from "../../../utils";

interface LineChartProps {
  data: OrderInfo[] | undefined;
  isLoading: boolean;
}

const { Option } = Select;
const { RangePicker } = DatePicker;

const LineStatusChartComponent: React.FC<LineChartProps> = (props) => {
  const { data: orders, isLoading } = props;
  const [dateFilter, setDateFilter] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);

  const [activeInterval, setActiveInterval] =
    useState<IntervalType>(DAILY_DATA);

  const handleDateChange = (dates: any) => {
    setDateFilter(dates);
  };

  const processOrderData = (
    orders: OrderInfo[],
    interval: IntervalType
  ): OrderLineChartProps => {
    const filteredOrders = filterOrdersByInterval(orders, interval, dateFilter);

    const dates = filteredOrders?.map((order) =>
      new Date(order.createdAt).toISOString()
    );
    const uniqueDates = [...new Set(dates)].sort();

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
          tooltip: { x: { format: "dd/MM/yy HH:mm:ss" } },
        },
      };
    }

    const statusData: { [key: string]: number[] } = {
      Pending: new Array(uniqueDates.length).fill(0),
      "Partially filled": new Array(uniqueDates.length).fill(0),
      Completed: new Array(uniqueDates.length).fill(0),
      Cancelled: new Array(uniqueDates.length).fill(0),
    };

    filteredOrders?.forEach((order) => {
      const orderDate = new Date(order.createdAt).toISOString();
      const dateIndex = uniqueDates.indexOf(orderDate);

      if (dateIndex !== -1 && order) {
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

    const categories = uniqueDates;
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
        x: { format: "dd/MM/yy HH:mm:ss" },
      },
    };

    return { series, options };
  };

  const [formatedData, setFormatedData] = useState<OrderLineChartProps>(
    processOrderData(orders as OrderInfo[], activeInterval)
  );

  const updateChartInterval = (interval: IntervalType) => {
    setActiveInterval(interval);
    setFormatedData(processOrderData(orders as OrderInfo[], interval));
  };

  useEffect(() => {
    if (!isLoading) {
      setFormatedData(processOrderData(orders as OrderInfo[], activeInterval));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, dateFilter]);

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
        onChange={(value) => updateChartInterval(value)}
        style={{ width: "10rem" }}
        value={activeInterval}
      >
        {Object.keys(intervalMapping).map((interval) => (
          <Option key={interval} value={interval}>
            {interval}
          </Option>
        ))}
      </Select>
      <RangePicker
        onChange={handleDateChange}
        style={{ marginLeft: 10 }}
        disabledDate={(current) =>
          current && current.isAfter(dayjs().endOf("day"), "day")
        }
      />
      <Spin spinning={isLoading}>
        {!isLoading && (
          <LineChart key={activeInterval} formatedData={formatedData} />
        )}
      </Spin>
    </div>
  );
};

export default LineStatusChartComponent;
