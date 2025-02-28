import { Menu } from "antd";
import {
  OrderedListOutlined,
  SyncOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { StyledSider } from "./style";
import { Link, useLocation } from "react-router-dom";
import { onScrollToTop } from "../../../utils/scroll";

const menuItems = [
  {
    key: "1",
    label: (
      <Link onClick={() => onScrollToTop("create-form")} to="/">
        User Management
      </Link>
    ),
    path: "/",
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: (
      <Link onClick={() => onScrollToTop()} to="/about">
        Order Management
      </Link>
    ),
    path: "/about",
    icon: <OrderedListOutlined />,
  },
  {
    key: "3",
    label: (
      <Link onClick={() => onScrollToTop()} to="/contact">
        Matching Management
      </Link>
    ),
    path: "/contact",
    icon: <SyncOutlined />,
  },
  {
    key: "3",
    label: (
      <Link onClick={() => onScrollToTop()} to="/contact">
        Contest Management
      </Link>
    ),
    path: "/contact",
    icon: <TrophyOutlined />,
  },
];

const AppSider = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const selectedKey =
    menuItems.find((item) => item.path === location.pathname)?.key || "";
  // const navigateUrl = (url: string) => {
  //   navigate(url);
  // }
  return (
    <StyledSider width={300}>
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
