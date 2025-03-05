import { AppHeader } from "./style";
import { AppButton } from "../app-button";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <AppHeader>
      <div className="header-title" onClick={toggleSidebar}>
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
