import type { WeatherDataResponse } from '@/types';
import axios, { type AxiosResponse } from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY ?? 'http://localhost:3000'
});

// axios interceptor
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signIn = (email: string, password: string): Promise<AxiosResponse<{access_token: string}>> =>{
    return api.post("/api/auth/login", { email, password })
};

export const getWeatherData = (): Promise<AxiosResponse<WeatherDataResponse[]>> =>{
    return api.get("/api/weather")
};

export const getWeatherInsights = (): Promise<AxiosResponse<any>> =>{
    return api.get("/api/weather/insights")
};

export const exportCsv = (): Promise<AxiosResponse<any>> =>{
    return api.get("/api/weather/export/csv")
};

export const exportXlsx = (): Promise<AxiosResponse<any>> =>{
    return api.get("/api/weather/export/xlsx")
};