import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface GoogleLoginPayload {
  email: string;
  fullName: string;
  accessToken: string;
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

export const loginWithGoogle = async (payload: GoogleLoginPayload): Promise<AuthCredentials> => {
  const response = await api.post(
    `${appUrls.authenURL}/login-google`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.accessToken}`,
      },
    }
  );
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

export const promoteUsers = async (uids: string[]): Promise<void> => {
  await api.post(`${appUrls.authenURL}/admin/promote`, { uids });
}

export const demoteUsers = async (uids: string[]): Promise<void> => {
  await api.post(`${appUrls.authenURL}/admin/demote`, { uids });
}