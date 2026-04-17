import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { WalletServices } from "@/lib/services/Page/WalletServices";
import { useQuery } from "@tanstack/react-query";

export const useWalletBalance = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.WALLET.balance(),
    queryFn: () => WalletServices.getBalance(),
    staleTime: 30000,
    ...options,
  });
};
