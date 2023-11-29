import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVaribles";

const { VITE_API_URL } = getEnvVariables();

const carampagueApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});
carampagueApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };
  return config;
});

export default carampagueApi;
