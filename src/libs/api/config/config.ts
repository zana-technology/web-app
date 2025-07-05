const config = {
  BASE_API_URL: process.env.VITE_API_URL as string,
  BASE_URL: (process.env.VITE_BASE_URL as string) || "http://localhost:3300",
};

export default config;
