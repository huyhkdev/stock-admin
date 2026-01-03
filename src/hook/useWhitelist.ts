import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWhitelistEmails,
  addWhitelistEmail,
  addWhitelistEmails,
  deleteWhitelistEmail,
  WhitelistResponse,
} from "../apis/auth.api";

export const useWhitelistEmails = (page: number = 1, limit: number = 20) => {
  return useQuery<WhitelistResponse>({
    queryKey: ["whitelist", page, limit],
    queryFn: () => getWhitelistEmails(page, limit),
  });
};

export const useAddWhitelistEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => addWhitelistEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whitelist"] });
    },
  });
};

export const useAddWhitelistEmails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emails: string[]) => addWhitelistEmails(emails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whitelist"] });
    },
  });
};

export const useDeleteWhitelistEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => deleteWhitelistEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whitelist"] });
    },
  });
};

