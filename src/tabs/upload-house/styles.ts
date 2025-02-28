import { Checkbox, InputNumber, Radio, Steps } from "antd";
import styled from "styled-components";

export const UploadHouseSteps = styled(Steps)`
  background-color: var(--app-white-color);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const FormStyle = styled.div`
  .upload-house-form {
    background-color: var(--app-white-color);
    padding: 10px;
    h2 {
      padding: 10px 10px 20px 10px;
    }
    .ant-form {
      .ant-space-compact {
        width: 100%;
        .ant-form-item {
          flex: 1;
        }
      }
    }
  }
`;

export const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .ant-checkbox-wrapper {
    width: 20%;
    margin-bottom: 8px;
  }
`;
export const StyleInputNumber = styled(InputNumber)`
  width: 100%;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: space-between;
  background-color: #f0f5ff;
  border-radius: 8px;
  width: 50%;
  .ant-radio-wrapper {
    flex: 1;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    .ant-radio {
      display: none;
    }
  }
  .ant-radio-wrapper-checked {
    background-color: #4096ff;
    color: white;
  }
`;