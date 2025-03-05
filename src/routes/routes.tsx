import { Routes, Route } from "react-router-dom";
import {
  ContestManagement,
  MatchingManagement,
  OrderManagement,
  UserManagement,
} from "../tabs/management";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserManagement />} />
      <Route path="/order" element={<OrderManagement />} />
      <Route path="/matching" element={<MatchingManagement />} />
      <Route path="/contest" element={<ContestManagement />} />
    </Routes>
  );
};

export default AppRoutes;
