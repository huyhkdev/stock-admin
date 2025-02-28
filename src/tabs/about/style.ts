import { ColorType } from "lightweight-charts";
import styled from "styled-components";
import { Space } from "antd";
import { DAILY_DATA, MONTHLY_DATA, WEEKLY_DATA, YEARLY_DATA } from "./constants";

export const StyledContainer = styled(Space)`
  width: 100%;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: "flex";
  flex-direction: "column";
  align-items: "center";
`;

export const intervalColors = {
  [DAILY_DATA]: "#2962FF",
  [WEEKLY_DATA]: "rgb(225, 87, 90)",
  [MONTHLY_DATA]: "rgb(242, 142, 44)",
  [YEARLY_DATA]: "rgb(164, 89, 209)",
};

export const chartOptions = {
  layout: {
    textColor: "black",
    background: { type: ColorType.Solid, color: "white" },
  },
  height: 400,
};

export const ChartContainer = styled.div`
  width: 100%;
  height: 420px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu,
    sans-serif;
  font-size: 16px;
  font-weight: 510;
  padding: 8px 24px;
  color: #131722;
  background-color: #f0f3fa;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e3eb;
  }

  &:active {
    background-color: #d1d4dc;
  }
`;
