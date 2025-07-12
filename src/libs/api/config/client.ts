import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { constant, hasTokenExpired } from "../../utils";
import config from "./config";
import { routes } from "@/router";

const client: AxiosInstance = axios.create({
  //   withCredentials: true,
});

const exceptionEndpoint = [`${config.BASE_URL}/auth/login`];

const getTokenData = () => {
  const token = localStorage.getItem("access_token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  return { token, tokenExpiry };
};

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("tokenExpiry");
  window.location.href = routes.auth.login;
};

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { token, tokenExpiry } = getTokenData();

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
