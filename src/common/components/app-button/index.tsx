import styled from "styled-components";
import { Button, ButtonProps } from "antd";

interface AppButtonProps extends ButtonProps {
  customStyle?: string;
}

export const AppButton = styled(Button)<AppButtonProps>`
  border-radius: 4px;
  color: var(--app-white-color);
  background-color: var(--primary-color);
  ${(props) => props.customStyle || ""}
`;
