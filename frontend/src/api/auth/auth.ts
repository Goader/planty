import {AuthData, TokenPair, UserData} from "../../model/auth";
import axios, {AxiosError} from "axios";
import {createAuthHeaders, RegisterInputError, UnauthorizedError} from "./util";

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
            if (e instanceof AxiosError && e.response?.status === 401) {
                throw new UnauthorizedError();
            } else {
                throw e;
            }
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
            if (e instanceof AxiosError && e.response?.status === 400) {
                throw new RegisterInputError('Invalid input', e.response?.data);
            } else {
                throw e;
            }
        }
    },
    refresh: async (refreshToken: string): Promise<AuthData> => {
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
    }
};

export async function fetchCurrentUser(token: string): Promise<UserData> {
    if (token === null) {
        throw new Error('no_token');
    }
    try {
        const response = await axios.get<UserData>(authUrl + 'current_user/', {
            headers: createAuthHeaders(token)
        });
        return response.data;
    } catch (e: any) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            throw new UnauthorizedError();
        } else {
            throw e;
        }
    }
}
