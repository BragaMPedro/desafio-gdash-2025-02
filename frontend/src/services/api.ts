import axios, { type AxiosResponse } from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY ?? 'https://localhost:3000'
});

export const signIn = (email: string, password: string): Promise<AxiosResponse<any>> =>{
    return api.post("/api/auth/login", {data: { email, password } })
};

export const getWeatherData = (): Promise<AxiosResponse<any>> =>{
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