import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  ContestManagement,
  MatchingManagement,
  OrderManagement,
  UserManagement,
} from "../tabs/management";
import LoginScreen from "../tabs/auth/login";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BannerEventManagement } from "../tabs/management/banner-event";
import WhitelistManagement from "../tabs/management/whitelist";

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/order" element={<OrderManagement />} />
          <Route path="/matching" element={<MatchingManagement />} />
          <Route path="/contest" element={<ContestManagement />} />
          <Route path="/banner-event" element={<BannerEventManagement />} />
          <Route path="/whitelist" element={<WhitelistManagement />} />
        </>
      ) : (
        <Route path="/login" element={<LoginScreen />} />
      )}

      <Route path="*" element={<Navigate to={isLoggedIn ? "/users" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;