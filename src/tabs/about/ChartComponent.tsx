import React, { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { Select, Space } from "antd";
import { dayData, monthData, weekData, yearData } from "./data";
import { ChartContainer, chartOptions, intervalColors, StyledContainer } from "./style";
import { DAILY_DATA, MONTHLY_DATA, WEEKLY_DATA, YEARLY_DATA } from "./constants";

const { Option } = Select;

const seriesData = {
  [DAILY_DATA]: dayData,
  [WEEKLY_DATA]: weekData,
  [MONTHLY_DATA]: monthData,
  [YEARLY_DATA]: yearData,
};

const ChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [selectedKey, setSelectedKey] = useState<"Trọ A" | "Trọ B" | "Trọ C" | "Total">("Total");
  const [activeInterval, setActiveInterval] = useState<typeof DAILY_DATA | typeof WEEKLY_DATA | typeof MONTHLY_DATA | typeof YEARLY_DATA>(
    DAILY_DATA
  );

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      ...chartOptions,
      width: chartContainerRef.current.clientWidth,
    });
    const lineSeries = chart.addLineSeries({ color: intervalColors[DAILY_DATA] });
    const data = calculateSumData(seriesData[DAILY_DATA], "Total");
    lineSeries.setData(data);

    chartRef.current = chart;
    lineSeriesRef.current = lineSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, 400);
      }
    };

    chart.timeScale().fitContent();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  const updateChartInterval = (interval: keyof typeof seriesData) => {
    if (!lineSeriesRef.current || !chartRef.current) return;

    setActiveInterval(interval);

    const data = calculateSumData(seriesData[interval], selectedKey);
    lineSeriesRef.current.setData(data);
    lineSeriesRef.current.applyOptions({ color: intervalColors[interval] });
    chartRef.current.timeScale().fitContent();
  };

  const updateChartKey = (key: "Trọ A" | "Trọ B" | "Trọ C" | "Total") => {
    if (!lineSeriesRef.current || !chartRef.current) return;

    setSelectedKey(key);

    const data = calculateSumData(seriesData[activeInterval], key);
    lineSeriesRef.current.setData(data);
    chartRef.current.timeScale().fitContent();
  };

  const calculateSumData = (
    data: Array<{ time: string; customValues: Record<string, number> }>,
    key: string
  ) => {
    if (key === "Total") {
      return data.map((entry) => {
        const totalValue = Object.values(entry.customValues).reduce(
          (sum, value) => sum + value,
          0
        );
        return {
          time: entry.time,
          value: totalValue,
        };
      });
    } else {
      return data.map((entry) => ({
        time: entry.time,
        value: entry.customValues[key],
      }));
    }
  };

  return (
    <StyledContainer direction="vertical" size="middle">
      <Space>
        <Select
          value={activeInterval}
          onChange={(value) =>
            updateChartInterval(value as keyof typeof seriesData)
          }
          style={{ width: 200 }}
        >
        {Object.keys(seriesData).map((interval) => (
            <Option key={interval} value={interval}>
              {interval}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedKey}
          onChange={(value) =>
            updateChartKey(value as "Trọ A" | "Trọ B" | "Trọ C" | "Total")
          }
          style={{ width: 200 }}
        >
          {["Total", "Trọ A", "Trọ B", "Trọ C"].map((key) => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>
      </Space>
      <ChartContainer ref={chartContainerRef} />
    </StyledContainer>
  );
};

export default ChartComponent;