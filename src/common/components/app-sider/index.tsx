import { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  OrderedListOutlined,
  SyncOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StyledSider } from "./style";
import { Link, useLocation } from "react-router-dom";
import { onScrollToTop } from "../../../utils/scroll";

const menuItems = [
  {
    key: "1",
    label: (
      <Link onClick={() => onScrollToTop("create-form")} to="/users">
        User Management
      </Link>
    ),
    path: "/users",
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: (
      <Link onClick={() => onScrollToTop()} to="/order">
        Order Management
      </Link>
    ),
    path: "/order",
    icon: <OrderedListOutlined />,
  },
  {
    key: "3",
    label: (
      <Link onClick={() => onScrollToTop()} to="/matching">
        Matching Management
      </Link>
    ),
    path: "/matching",
    icon: <SyncOutlined />,
  },
  {
    key: "4",
    label: (
      <Link onClick={() => onScrollToTop()} to="/contest">
        Contest Management
      </Link>
    ),
    path: "/contest",
    icon: <TrophyOutlined />,
  },
];

const AppSider = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const location = useLocation();

  const selectedKey =
    menuItems.find((item) => item.path === location.pathname)?.key || "";
  return (
    <StyledSider
      collapsed={!isSidebarOpen}
      collapsedWidth={0}
      width={300}
      hidden={!selectedKey}
    >
      <div className="menu-section">
        <Menu
          mode="vertical"
          selectable={false}
          items={menuItems}
          selectedKeys={[selectedKey]}
        />
      </div>
    </StyledSider>
  );
};

export default AppSider;
