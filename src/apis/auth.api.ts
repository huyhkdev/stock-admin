import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<{ token: string }> => {
  const response = await api.post(`${appUrls.authenURL}/login`, credentials);
  return { token: response.data.data.accessToken };
};
