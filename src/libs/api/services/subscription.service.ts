import { apiRequest } from "../config";
import { apiRoutes } from "../routes";

const subscribe = async (plan: string) => {
  return await apiRequest({
    url: apiRoutes.subsccription.plan.replace("%plan%", plan),
    method: "post",
  });
};

export const subscriptionApi = {
  subscribe,
};
