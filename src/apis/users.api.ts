import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface UserInfo {
  id: string,
  fullname: string,
  email: string,
  role: string,
  cic: string,
  gender: string,
  dob: Date,
  campus: string,
  state: string,
  createdAt: Date,
  updatedAt: Date,
  balance: number;
}

export const getAllInfoUsers = async (): Promise<UserInfo[]> => {
  const response = await api.get(`${appUrls.authenURL}/admin/total-info`);
  return response.data.data;
};
