/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Response<T> {
  data?: T;
  success: boolean;
  errorMessage?: string;
  statusCode?: number;
  message?: string;
  error?: string;
  path?: string;
  meta?: PaginationMeta;
  timeStamp?: string;
  redirect?: string;
}

export type Data = Record<string, any>;

export type IErrorMessageDTO = {
  // data: string;
  status?: number;
  statusText?: string;
  data: {
    status: string;
    message: string | string[];
    error?: string;
    timestamp: string;
    path: string;
    statusCode: number;
  };
};
export interface IApiResponseDTO<T> {
  data: {
    data?: T;
    status: string;
    statusCode: number;
    message?: string | string[];
    meta?: PaginationMeta;
  };
}
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}
