import {AuthData, TokenPair, UserData} from "../model/auth";
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

export function isErrorUnauthorized(err: any): boolean {
    return err.message === 'unauthorized' || (err instanceof AxiosError && err.response?.status === 401);
}

export function handleUnauthorized(err: any, callback: () => void) {
    if (isErrorUnauthorized(err)) {
        callback();
    } else {
        throw err;
    }
}

export const internalAuthProvider = {
    login: async (username: string, password: string): Promise<AuthData> => {
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
            let user = await fetchCurrentUser(tokenPair.access);
            return {...user, ...tokenPair};
        } catch (e: any) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                throw new Error('unauthorized');
            } else {
                throw e;
            }
        }
    },
    register: async (username: string, password: string): Promise<AuthData> => {
        try {
            const response = await axios.post<AuthData>(url + 'signup/', {
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
};

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


export async function fetchCurrentUser(token: string): Promise<UserData> {
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

export function removeTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}
