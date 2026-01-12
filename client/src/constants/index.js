const API_CONFIG = {
  baseURL: import.meta.env.ENVIRONMENT === "development" ? import.meta.env.BASE_URL : import.meta.env.BASE_URL_PRODUCTION,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

export default API_CONFIG;