import styled from "styled-components";
import { Layout } from "antd";

const { Sider } = Layout;

// Styled Sider
export const StyledSider = styled(Sider)`
  margin: 16px 0 16px 16px;
  background: #fff;
  padding: 16px;
  .profile-section {
    text-align: center;
    margin-bottom: 16px;
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #e6e6e6;
      margin: 0 auto 8px;
    }
    .name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .id {
      font-size: 12px;
      color: #888;
    }
  }
  .info-section {
    margin-bottom: 16px;
    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      font-size: 14px;
    }
  }
  .button-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    button {
      width: 100%;
      height: 40px;
      font-size: 14px;
    }
  }

  .menu-section {
    margin-bottom: 16px;
    .ant-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
  }
`;
