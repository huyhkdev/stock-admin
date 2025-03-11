import { useEffect, useState } from "react";
import LineChart from "../../../common/components/line-chart";
import { DatePicker, Select, Spin } from "antd";
import {
  DAILY_DATA,
  intervalMapping,
  MONTHLY_DATA,
  WEEKLY_DATA,
  YEARLY_DATA,
} from "./constants";
import { OrderMatch } from "../../../apis/orders.api";
import { filterOrdersMatchByInterval } from "../../../utils";
import { ApexOptions } from "apexcharts";
import { SeriesData } from "../order/type";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface LineMatchChartProps {
  data: OrderMatch[] | undefined;
  loading: boolean;
}
export type IntervalType =
  | typeof DAILY_DATA
  | typeof WEEKLY_DATA
  | typeof MONTHLY_DATA
  | typeof YEARLY_DATA;

export interface OrderLineMatchChartProps {
  series: SeriesData[];
  options: ApexOptions;
}
const LineMatchChartComponent: React.FC<LineMatchChartProps> = (props) => {
  const { data, loading } = props;
  const [dateFilter, setDateFilter] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);

  const [activeInterval, setActiveInterval] =
    useState<IntervalType>(DAILY_DATA);

  const processOrderData = (
    data: OrderMatch[],
    interval: IntervalType
  ): OrderLineMatchChartProps => {
    let filteredOrdersMatch = filterOrdersMatchByInterval(
      data,
      interval,
      dateFilter
    );

    const dates = filteredOrdersMatch?.map((order) =>
      new Date(order.createdAt).toISOString()
    );
    const uniqueDates = [...new Set(dates)].sort();

    if (uniqueDates.length === 0) {
      return {
        series: [
          { name: "Order Sell Match", data: [] },
          { name: "Order Buy Match", data: [] },
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
      "Order Sell Match": new Array(uniqueDates.length).fill(0),
      "Order Buy Match": new Array(uniqueDates.length).fill(0),
    };

    filteredOrdersMatch?.forEach((order) => {
      const orderDate = new Date(order.createdAt).toISOString();
      const dateIndex = uniqueDates.indexOf(orderDate);

      if (dateIndex !== -1) {
        const statusKey =
          order.incomingOrderId === order.orderBuyId
            ? "Order Buy Match"
            : "Order Sell Match";
        statusData[statusKey][dateIndex]++;
      }
    });

    const series: SeriesData[] = [
      { name: "Order Sell Match", data: statusData["Order Sell Match"] },
      { name: "Order Buy Match", data: statusData["Order Buy Match"] },
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

  const [formatedData, setFormatedData] = useState<OrderLineMatchChartProps>(
    processOrderData(data as OrderMatch[], activeInterval)
  );

  const updateChartInterval = (interval: IntervalType) => {
    setActiveInterval(interval);
    setFormatedData(processOrderData(data as OrderMatch[], interval));
  };

  const handleDateChange = (dates: any) => {
    setDateFilter(dates);
  };

  useEffect(() => {
    if (!loading) {
      setFormatedData(processOrderData(data as OrderMatch[], activeInterval));
    }
  }, [loading, dateFilter]);

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
      <Spin spinning={loading}>
        {!loading && (
          <LineChart key={activeInterval} formatedData={formatedData} />
        )}
      </Spin>
    </div>
  );
};

export default LineMatchChartComponent;
