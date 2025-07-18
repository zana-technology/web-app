import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { constant, handleLogout, hasTokenExpired } from "../../utils";
import config from "./config";

const client: AxiosInstance = axios.create({
  //   withCredentials: true,
});

const exceptionEndpoint = [`${config.BASE_URL}/auth/login`];

const getToken = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiry = localStorage.getItem("token_expiry");
  const tokenExpiry = localStorage.getItem("refresh_token_expiry");

  if (!accessToken || !expiry) return { token: refreshToken, tokenExpiry };

  const now = new Date();
  const expiresAt = new Date(expiry);

  const isExpired = now >= expiresAt;

  const token = isExpired ? refreshToken : accessToken;

  return { token, tokenExpiry };
};

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { token, tokenExpiry } = getToken();

    if (!token) return config;

    if (tokenExpiry && hasTokenExpired(tokenExpiry)) {
      handleLogout();
      return Promise.reject(new Error(constant.tokenExpired));
    }

    if (token && !exceptionEndpoint.includes(String(config.url))) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const { status } = error?.response || {};

    if (status === 401) {
      handleLogout();
      delete client.defaults.headers.common.Authorization;
    }

    return Promise.reject(error);
  }
);

export default client;
