import axios from 'axios';

export const BASE_URL = "http://192.168.1.14:5020";
//export const BASE_URL = "http://10.190.10.22:5020";

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    },
    params: {
        'timestamp': `${new Date().getTime()}`
    }
});

export const authClient = (token: string, headers?: any) => axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...headers
    },
    params: {
        'timestamp': `${new Date().getTime()}`
    }
})
