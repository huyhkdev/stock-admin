import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "./common/styles/BaseStyles";
import Header from "./common/components/app-header";
import { AppStyle, StyledContent } from "./app.style";
import AppSider from "./common/components/app-sider";
import AppRoutes from "./routes/routes";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    console.log("isSidebarOpen: ", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <>
      <GlobalStyles />
      <AppStyle>
        <Router>
          <Header toggleSidebar={toggleSidebar} />
          <Layout
            className="app-layout"
            style={{ height: "100vh", marginTop: "64px" }}
          >
            <AppSider key={isSidebarOpen.toString()} isSidebarOpen={isSidebarOpen} />
            <Layout>
              <StyledContent>
                <AppRoutes />
              </StyledContent>
            </Layout>
          </Layout>
        </Router>
      </AppStyle>
    </>
  );
};

export default App;
