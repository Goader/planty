import React from "react";
import {AuthData} from "../model/auth";
import {fetchCurrentUser, getSavedRefreshToken, internalAuthProvider, removeTokens} from "../api/auth";
import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders} from "axios";

type AuthContextType = {
    user: AuthData | null,
    login: (username: string, password: string) => Promise<AuthData>,
    logout: () => void,
    register: (username: string, password: string) => Promise<AuthData>,
    request: <T, >(config: AxiosRequestConfig) => Promise<T>
}

const AuthContext = React.createContext<AuthContextType>(null!);

async function requestRefresh(refreshToken: string): Promise<AuthData> {
    const accessTokenResponse = await axios.post<{ access: string }>('http://localhost:3001/users/token/refresh/', {
        refresh: refreshToken
    });
    let accessToken = accessTokenResponse.data.access;
    let user = await fetchCurrentUser(accessToken);
    return {
        ...user,
        access: accessToken,
        refresh: refreshToken
    };
}

function createAuthHeaders(accessToken: string): AxiosRequestHeaders {
    return {
        Authorization: `Bearer ${accessToken}`
    };
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<AuthData | null>(null);

    const login = async (username: string, password: string) => {
        let user = await internalAuthProvider.login(username, password);
        setUser(user);
        return user;
    };

    const logout = () => {
        removeTokens();
        setUser(null);
    };

    const register = async (username: string, password: string) => {
        let user = await internalAuthProvider.register(username, password);
        setUser(user);
        return user;
    };

    const request = async <T, >(config: AxiosRequestConfig): Promise<T> => {
        let currentUser = user;
        if (currentUser === null) {
            const refreshToken = getSavedRefreshToken();
            if (refreshToken != null) {
                currentUser = await requestRefresh(refreshToken);
                setUser(currentUser);
            } else {
                throw Error('unauthorized');
            }
        }
        const allConfig = {...config};
        if (!allConfig.headers) {
            allConfig.headers = {};
        }
        Object.assign(allConfig.headers, createAuthHeaders(currentUser.access));
        try {
            const response = await axios.request<T>(allConfig);
            return response.data;
        } catch (e: any) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                currentUser = await requestRefresh(currentUser.refresh);
                setUser(currentUser);
                Object.assign(allConfig.headers, createAuthHeaders(currentUser.access));
                const response = await axios.request<T>(allConfig);
                return response.data;
            } else {
                throw e;
            }
        }
    };

    let value = {user, login, logout, register, request};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}