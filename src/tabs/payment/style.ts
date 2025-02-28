import styled from "styled-components";
import { Radio } from "antd";

export const StyledRadioButton = styled(Radio.Button)`
  width: 100px;
  height: 100px;
  margin: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
  background-color: ${(props) => (props.checked ? "#bae7ff" : "#fff")};
  transition: all 0.3s;
  cursor: pointer;

`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  font-weight: bold;
`;
