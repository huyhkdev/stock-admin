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
}

export interface ContestParticipant {
    contestId: number,
    uid: string,
    initialBalance: number,
    finalBalance: number,
}
export interface TopUser{
    uid: string;
    contestId: number;
    createdAt: Date;
    rank: number;
    increasedAmount: number;
    ROIC: number;
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