import { Routes, Route } from "react-router-dom";
import About from "../tabs/about";
import Contact from "../tabs/contact";
import Payment from "../tabs/payment";
import UserManagement from "../tabs/user-management";
import OrderManagement from "../tabs/order-management";
import MatchingManagement from "../tabs/matching-management";
import ContestManagement from "../tabs/contest-management";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserManagement />} />
      <Route path="/order" element={<OrderManagement />} />
      <Route path="/matching" element={<MatchingManagement />} />
      <Route path="/contest" element={<ContestManagement />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/payment" element={<Payment />} />
      {/* <Route path="/payment/transactions" element={<TransactionList />} />
      <Route path="/payment/transactions/:id" element={<TransactionDetail />} /> */}
    </Routes>
  );
};

export default AppRoutes;