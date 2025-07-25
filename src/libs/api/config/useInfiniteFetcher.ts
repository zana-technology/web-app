import { encodeQueryData, staleTimeMins } from "@/libs/utils";
import { Response } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiRequest } from "./apiRequest";

type InfiniteFetcherProps = {
  queryKey: (string | number)[];
  staleTime?: number;
  pageLimit?: number;
  hasFilters?: boolean;
  enabled?: boolean;
  url: string;
  triggerError?: boolean;
  initialFilter?: Record<string, any>;
  getNextPageParam?: (lastPage: any, allPages: any) => any;
};

export const useInfiniteFetcher = <T>(props: InfiniteFetcherProps) => {
  const {
    queryKey,
    url,
    staleTime,
    hasFilters = false,
    pageLimit = 50,
    enabled,
    triggerError = true,
    initialFilter,
    getNextPageParam,
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  const defaultPageParam = 0;

  interface BuildQueryProps {
    pageParam: number;
    pageLimit: number;
    searchQuery?: string;
    filters?: Record<string, any>;
    initialFilter?: Record<string, any>;
    hasFilters?: boolean;
  }

  const buildQuery = ({
    pageParam,
    pageLimit,
    searchQuery,
    filters,
    initialFilter,
    hasFilters,
  }: BuildQueryProps) => {
    const encodeQuery = encodeQueryData({
      ...{
        limit: pageLimit ?? 50,
        offset: pageParam,
      },
      ...(hasFilters && { ...filters, ...initialFilter }),
      ...(searchQuery && { query: searchQuery.trim().toLowerCase() }),
    });

    return encodeQuery;
  };

  const initialQuery = buildQuery({
    pageParam: defaultPageParam,
    pageLimit,
    searchQuery,
    filters,
    initialFilter,
    hasFilters,
  });

  const response = useInfiniteQuery<Response<T>>({
    queryKey: [...queryKey, initialQuery],
    queryFn: async ({ pageParam = defaultPageParam }) => {
      const query = buildQuery({
        pageParam: pageParam as number,
        pageLimit,
        searchQuery,
        filters,
        initialFilter,
        hasFilters,
      });
      try {
        const response = await apiRequest<T>({
          url: `${url}?${query}`,
          method: "get",
          triggerError: triggerError,
        });

        return response;
      } catch (error) {
        console.error("🚨 Error:", error);
        throw error;
      }
    },
    initialPageParam: 0,
    getNextPageParam:
      getNextPageParam ??
      ((lastPage) => {
        const paginated = lastPage?.data;

        if (!paginated) return undefined;

        const currentOffset = paginated.offset ?? 0;
        const currentCount = paginated.count ?? 0;
        const hasNextPage = !!paginated?.next;

        return hasNextPage && currentCount === pageLimit ? currentOffset + pageLimit : undefined;
      }),
    staleTime: staleTimeMins(staleTime ?? 60),
    retry: 3,
    retryDelay: 2000,
    enabled,
  });

  return {
    setSearchQuery,
    setFilters,
    filters,
    ...response,
  };
};
