/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Response<T> {
  data?: T;
  success: boolean;
  errorMessage?: string;
  errorTitle?: string;
  title?: string;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
  redirect?: string;
}

export type Data = Record<string, any>;

export type IErrorMessageDTO = {
  status?: number;
  statusText?: string;
  data: {
    status: string;
    message: string;
    detail: string;
    errors: string | string[] | null;
  };
};
export interface IApiResponseDTO<T> {
  status: string;
  message?: string;
  detail?: string;
  data?: T;
  errors?: any;
  meta?: PaginationMeta;
}
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}
