import { Routes, Route } from "react-router-dom";
import { UploadHouse } from "../tabs/upload-house";
import About from "../tabs/about";
import Contact from "../tabs/contact";
import Payment from "../tabs/payment";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UploadHouse />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/payment" element={<Payment />} />
      {/* <Route path="/payment/transactions" element={<TransactionList />} />
      <Route path="/payment/transactions/:id" element={<TransactionDetail />} /> */}
    </Routes>
  );
};

export default AppRoutes;