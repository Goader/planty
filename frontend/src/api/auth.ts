import {RegisterResponse, TokenPair, UserData} from "../model/auth";
import axios, {AxiosError, AxiosRequestHeaders} from "axios";

const url = 'http://localhost:3001/users/';

export class RegisterInputError extends Error {
    public errors: any;

    constructor(msg: string, errors: object) {
        super(msg);
        this.errors = errors;
        Object.setPrototypeOf(this, RegisterInputError.prototype);
    }
}

export function getSavedAccessToken() {
    return localStorage.getItem('token');
}

export function getSavedRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function isAccessTokenSaved() {
    return getSavedAccessToken() != null;
}

export function getAuthHeaders(): AxiosRequestHeaders {
    return {
        Authorization: `Bearer ${getSavedAccessToken()}`
    };
}


export async function fetchCurrentUser(): Promise<UserData> {
    const token = getSavedAccessToken();
    if (token === null) {
        throw new Error('no_token');
    }
    try {
        const response = await axios.get<UserData>(url + 'current_user/', {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (e: any) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            throw new Error('unauthorized');
        } else {
            throw e;
        }
    }
}

export async function login(username: string, password: string): Promise<UserData> {
    try {
        const response = await axios.post<TokenPair>(url + 'token/', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const tokenPair = response.data;
        localStorage.setItem('token', tokenPair.access);
        localStorage.setItem('refreshToken', tokenPair.refresh);
        return await fetchCurrentUser();
    } catch (e: any) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            throw new Error('unauthorized');
        } else {
            throw e;
        }
    }
}

export async function register(username: string, password: string): Promise<RegisterResponse> {
    try {
        const response = await axios.post<RegisterResponse>(url + 'signup/', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e: any) {
        if (e instanceof AxiosError && e.response?.status === 400) {
            throw new RegisterInputError('Invalid input', e.response?.data);
        } else {
            throw e;
        }
    }
}