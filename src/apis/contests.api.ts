import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface Contest {
    contestId: number|null;
    contestName: string;
    startDateTime: Date;
    endDateTime: Date;
    banner: string;
    maxParticipants: number;
    isStrict?: boolean;
    allowJoinEmails?: string[];
    creatorUid?: string;
}

export interface ContestParticipant {
    contestId: number,
    uid: string,
    rankId: number | null,
    participantName: string,
    participantEmail: string,
    participantUsername: string,
}
export interface TopUser{
    uid: string;
    contestId: number;
    createdAt: Date;
    rank: number;
    increasedAmount: number;
    ROIC: number;
    username?: string;
    email?: string;
    debug?: {
        totalProfit: number;
        totalROIC: number;
        totalRealizedPnL: number;
        totalUnrealizedPnL: number;
        totalInvested: number;
        tickerCount: number;
        tickerDetails: Array<{
            ticker: string;
            position: number;
            avgCost: number;
            currentPrice: number;
            totalBuyValue: number;
            totalSellValue: number;
            realizedPnL: number;
            unrealizedPnL: number;
            totalPnL: number;
        }>;
    };
}

export interface ContestDetailResponse {
    contestId: number;
    startDateTime: string;
    contestName: string;
    maxParticipants: number;
    endDateTime: string;
    banner: string;
    isStrict: boolean;
    creatorUid: string;
    participants: ContestParticipant[];
    allowJoinEmails: string[];
    rankList: TopUser[];
}
 export const getAllContests = async (): Promise<Contest[]> => {
        const response = await api.get(`${appUrls.tradeURL}/contests`);
        return response.data.data;
    };

export const getContestById = async (id: number): Promise<Contest> => {
    
    const response = await api.get(`${appUrls.tradeURL}/contests/${id}`);
    return response.data.data;
};
export const getContestParticipantsByContestId = async (contestId: number): Promise<ContestParticipant[]> => {
    const response = await api.get(`${appUrls.tradeURL}/contests/${contestId}/paticipants/list`);
    return response.data.data;
};

export const createContest = async (formData: FormData): Promise<Contest> => {
    const response = await api.post(`${appUrls.tradeURL}/admin/contests/create-contest`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data.data;
};
export const updateContest = async (contestId: number, formData: FormData): Promise<Contest> => {
    const response = await api.post(`${appUrls.tradeURL}/admin/contests/${contestId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data.data;
};
export const deleteContest = async (contestId: number): Promise<boolean> => {
    const response = await api.delete(`${appUrls.tradeURL}/admin/contests/${contestId}`);
    return response.data.data;
};
export const getRankByContest = async (contestId: number): Promise<TopUser[]> => {
    const response = await api.get(`${appUrls.tradeURL}/contests/${contestId}/rank/list`);
    return response.data.data;
};
export const getCurrentRankByContest = async (contestId: number): Promise<TopUser[]> => {
    const response = await api.get(`${appUrls.tradeURL}/current-rank/contests/${contestId}`);
    return response.data.data;
};

export const getContestDetail = async (contestId: number): Promise<ContestDetailResponse> => {
    const response = await api.get(`${appUrls.tradeURL}/contests/${contestId}`);
    return response.data.data;
};

export const exportContestOrders = async (contestId: number): Promise<Blob> => {
    const response = await api.get(`${appUrls.tradeURL}/admin/contest/${contestId}/orders/export`, {
        responseType: 'blob',
    });
    return response.data;
};

export const exportContestRanks = async (contestId: number): Promise<Blob> => {
    const response = await api.get(`${appUrls.tradeURL}/admin/contest/${contestId}/ranks/export`, {
        responseType: 'blob',
    });
    return response.data;
};