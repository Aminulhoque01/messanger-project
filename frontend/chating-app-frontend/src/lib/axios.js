import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});