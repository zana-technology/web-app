import { useState } from "react";
import { Response } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { encodeQueryData, staleTimeMins } from "../../utils";
import { apiRequest } from "./apiRequest";

type FetcherProps = {
  queryKey: (string | number)[];
  staleTime?: number;
  paginate?: boolean;
  pageLimit?: number;
  hasFilters?: boolean;
  enabled?: boolean;
  url: string;
  triggerError?: boolean;
};

export const useFetcher = <T>(props: FetcherProps) => {
  const {
    queryKey,
    url,
    staleTime,
    paginate = false,
    hasFilters = false,
    pageLimit,
    enabled,
    triggerError = true,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  const encodeQuery = encodeQueryData({
    ...(paginate && {
      limit: pageLimit ?? 50,
      offset: currentPage,
    }),
    ...(hasFilters && { ...filters }),
    ...(searchQuery && { search: searchQuery.trim().toLowerCase() }),
  });

  const response = useQuery<Response<T>>({
    queryKey: [...queryKey, encodeQuery],
    queryFn: async () => {
      try {
        const response = await apiRequest<T>({
          url: `${url}?${encodeQuery}`,
          method: "get",
          triggerError: triggerError,
        });

        return response;
      } catch (error) {
        console.error("🚨 Error:", error);
        throw error;
      }
    },
    staleTime: staleTimeMins(staleTime ?? 60),
    placeholderData: (prevData) => prevData,
    retry: 3,
    retryDelay: 2000,
    enabled: enabled ?? true,
  });

  return {
    currentPage,
    setSearchQuery,
    setCurrentPage,
    setFilters,
    filters,
    ...response,
  };
};
