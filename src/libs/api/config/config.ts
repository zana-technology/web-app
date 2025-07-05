const config = {
  BASE_API_URL: import.meta.env.VITE_API_URL as string,
  BASE_URL:
    (import.meta.env.VITE_BASE_URL as string) || "http://localhost:3300",
};

export default config;
