import { Layout } from "antd";
import styled from "styled-components";

export const AppStyle = styled.div`
  .ant-layout {
    &.app-layout {
      margin: 40px;
    }

    .ant-layout-sider {
      max-width: 250px !important;
      min-width: 250px !important;
      width: 250px !important;
      color: #000;
    }
  }
`;

export const StyledContent = styled(Layout.Content)`
  overflow-y: auto;
  padding: 16px;
  height: calc(100vh - 64px);
  background-color: var(--background-content-color);
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
