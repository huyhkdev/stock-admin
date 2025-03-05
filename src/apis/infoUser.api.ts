import api from "./axiosCustom";

export const createPayment = async () => {
  const response = await api.get("/create_payment_url");
  return response.data;
};
