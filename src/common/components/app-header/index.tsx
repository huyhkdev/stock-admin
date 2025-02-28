import { AppHeader } from "./style";
import { AppButton } from "../app-button";
import { HomeOutlined } from "@ant-design/icons";
const Header = () => {
  return (
    <AppHeader>
      <div className="header-title">
        <HomeOutlined style={{ marginRight: 8 }} />
        Dashboard
      </div>

      <div className="app-header--right">
        <AppButton icon={<UserOutlined />}>Username</AppButton>
      </div>
    </AppHeader>
  );
};

export default Header;
