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

export const resetWallet = async (uid: string, balance: number): Promise<void> => {
  await api.post(`${appUrls.tradeURL}/admin/wallet/reset/${uid}`, { balance });
}

// Whitelist Email APIs
export interface WhitelistEmail {
  id: string;
  email: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WhitelistResponse {
  items: WhitelistEmail[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getWhitelistEmails = async (page: number = 1, limit: number = 20): Promise<WhitelistResponse> => {
  const response = await api.get(`${appUrls.authenURL}/admin/whitelist`, {
    params: { page, limit },
  });
  return response.data.data;
};

export const addWhitelistEmail = async (email: string): Promise<WhitelistEmail> => {
  const response = await api.post(`${appUrls.authenURL}/admin/whitelist`, { email });
  return response.data.data;
};

export const addWhitelistEmails = async (emails: string[]): Promise<{ added: number; skipped: number }> => {
  const response = await api.post(`${appUrls.authenURL}/admin/whitelist/bulk`, { emails });
  return response.data.data;
};

export const deleteWhitelistEmail = async (email: string): Promise<void> => {
  await api.delete(`${appUrls.authenURL}/admin/whitelist/${encodeURIComponent(email)}`);
};
