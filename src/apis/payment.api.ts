import api from "./axiosCustom";

export const createPayment = async (paymentData: any) => {
  const response = await api.post("/create_payment_url", paymentData);
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get("/transactions");
  return response.data;
};

export const getTransactionDetail = async (id: number) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};
