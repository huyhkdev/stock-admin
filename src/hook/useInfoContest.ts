import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContest, deleteContest, getAllContests, getContestById, getContestParticipantsByContestId, getCurrentRankByContest, getRankByContest, updateContest } from "../apis/contests.api";


// export const useInfoContests = (page: number, limit: number) => {
//     return useQuery({
//         queryKey: ["contests",page, limit],
//         queryFn: () => getAllContests(page, limit),
//     });
// };
export const useInfoContests = () => {
    return useQuery({
        queryKey: ["contests"],
        queryFn: ()=>getAllContests(),
    });
};

export const useInfoOneContest = (contestId: number) => {
    return useQuery({
        queryKey: ["oneContest", contestId],
        queryFn: () => getContestById(contestId),
        enabled: !!contestId,
    });
};
export const useInfoContestParticipants = (contestId: number) => {
    return useQuery({
        queryKey: ["contestParticipants", contestId],
        queryFn: () => getContestParticipantsByContestId(contestId),
        enabled: !!contestId,
    });
};
export const useInfoCurrentRank = (contestId: number) => {
  return useQuery({
      queryKey: ["currentRank", contestId],
      queryFn: () => getCurrentRankByContest(contestId),
      enabled: !!contestId,
  });
};

export const useInfoFinalRank = (contestId: number) => {
  return useQuery({
      queryKey: ["finalRank", contestId],
      queryFn: () => getRankByContest(contestId),
      enabled: !!contestId,
  });
};
export const useCreateContest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createContest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contests"] });
        },
    });
};
export const useUpdateContest = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ contestId, formData }: { contestId: number; formData: FormData }) => 
        updateContest(contestId, formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contests"] });
      },
    });
  };
  export const useDeleteContest = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteContest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contests"] });
      },
    });
  };