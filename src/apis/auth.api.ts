import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface LoginCredentials {
  username: string;
  password: string;
}
export interface AuthCredentials {
  token: string;
  refreshToken: string;
}
export const login = async (credentials: LoginCredentials): Promise<AuthCredentials> => {
  const response = await api.post(`${appUrls.authenURL}/login`, credentials);
  return {
    token: response.data.data.accessToken,
    refreshToken: response.data.data.refreshToken,
  };
};

export const blockUsers = async (uids: string[]): Promise<void> => {
  await api.post(`${appUrls.authenURL}/admin/block`, { uids });
}

export const unblockUsers = async (uids: string[]): Promise<void> => {
  await api.post(`${appUrls.authenURL}/admin/un-block`, { uids });
}