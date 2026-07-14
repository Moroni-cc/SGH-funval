import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://www.hs-api.devfunval.cloud', 
  withCredentials: true 
});