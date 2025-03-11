import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface UserInfo {
  id: string,
  fullName: string,
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

export interface Portfolio {
  id: string;
  uid: string;
  ticker: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  id: string;
  uid: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Assets {
  portfolios: Portfolio[];
  wallet: Wallet[];
}
export const getAllInfoUsers = async (): Promise<UserInfo[]> => {
  const response = await api.get(`${appUrls.authenURL}/admin/total-info`);
  return response.data.data;
};

export const getUserAssets = async (uid: string): Promise<Assets> => {
  const response = await api.get(`${appUrls.tradeURL}/admin/assets/${uid}`);
  return response.data.data;
};

export const getAllUserAssets = async (): Promise<Assets> => {
  const response = await api.get(`${appUrls.tradeURL}/admin/assets`);
  return response.data.data;
};
