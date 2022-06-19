import {AuthData, TokenPair, UserData} from "../../model/auth";
import axios, {AxiosRequestConfig} from "axios";
import {createAuthHeaders, processHttpError} from "./util";

const authUrl = process.env.REACT_APP_API_URL + '/users/';

export const internalAuthProvider = {
    login: async (username: string, password: string): Promise<AuthData> => {
        try {
            const response = await axios.post<TokenPair>(authUrl + 'token/', {
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
            return {
                ...user,
                token: tokenPair
            };
        } catch (e: any) {
            throw processHttpError(e);
        }
    },
    register: async (username: string, password: string): Promise<AuthData> => {
        try {
            const response = await axios.post<AuthData>(authUrl + 'signup/', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (e: any) {
            throw processHttpError(e);
        }
    },
    refresh: async (refreshToken: string): Promise<AuthData> => {
        try {
            const accessTokenResponse = await axios.post<{ access: string }>(authUrl + 'token/refresh/', {
                refresh: refreshToken
            });
            let accessToken = accessTokenResponse.data.access;
            let user = await fetchCurrentUser(accessToken);
            return {
                ...user,
                token: {
                    access: accessToken,
                    refresh: refreshToken
                }
            };
        } catch (e: any) {
            throw processHttpError(e);
        }
    },
    request: async <T, >(config: AxiosRequestConfig, accessToken: string): Promise<T> => {
        const allConfig = {...config};
        if (!allConfig.headers) {
            allConfig.headers = {};
        }
        Object.assign(allConfig.headers, createAuthHeaders(accessToken));
        try {
            const response = await axios.request<T>(allConfig);
            return response.data;
        } catch (e: any) {
            throw processHttpError(e);
        }
    }
};

async function fetchCurrentUser(token: string): Promise<UserData> {
    const response = await axios.get<UserData>(authUrl + 'current_user/', {
        headers: createAuthHeaders(token)
    });
    return response.data;
}
