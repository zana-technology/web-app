import { Subscription } from "@/types";
import { apiQueryKeys, apiRequest, useFetcher } from "../config";
import { apiRoutes } from "../routes";

const subscribe = async (plan: string) => {
  return await apiRequest<{ id: string; url: string }>({
    url: apiRoutes.subscription.plan.replace("%plan%", plan),
    method: "post",
  });
};

const useSubscriptionStatus = () => {
  return useFetcher<Subscription>({
    queryKey: [apiQueryKeys.getSubStatus],
    url: apiRoutes.subscription.status,
  });
};

export const subscriptionApi = {
  subscribe,
  useSubscriptionStatus,
};
