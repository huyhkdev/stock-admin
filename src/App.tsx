import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "./common/styles/BaseStyles";
import Header from "./common/components/app-header";
import { AppStyle, StyledContent } from "./app.style";
import AppSider from "./common/components/app-sider";
import AppRoutes from "./routes/routes";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppStyle>
        <Router>
          <Header />
          <Layout
            className="app-layout"
            style={{ height: "100vh", marginTop: "64px" }}
          >
            <AppSider />
            <Layout>
              <StyledContent>
                <AppRoutes/>
              </StyledContent>
            </Layout>
          </Layout>
        </Router>
      </AppStyle>
    </>
  );
};

export default App;
