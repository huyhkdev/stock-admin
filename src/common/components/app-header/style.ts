import styled from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;
export const AppHeader = styled(Header)`
  z-index: 4;
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: space-between;
  background-color: var(--background-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .app-header--right {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .header-title{
    font-size: 20px;
  }
`;
