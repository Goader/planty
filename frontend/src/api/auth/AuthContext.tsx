import React from "react";
import {AuthData} from "../../model/auth";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {internalAuthProvider} from "./auth";
import {createAuthHeaders, getSavedRefreshToken, removeTokens, UnauthorizedError} from "./util";

type AuthContextType = {
    user: AuthData | null,
    login: (username: string, password: string) => Promise<AuthData>,
    logout: () => void,
    register: (username: string, password: string) => Promise<AuthData>,
    request: <T, >(config: AxiosRequestConfig) => Promise<T>,
    refresh: () => Promise<AuthData>
}

const AuthContext = React.createContext<AuthContextType>(null!);

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
            currentUser = await refresh();
        }
        const allConfig = {...config};
        if (!allConfig.headers) {
            allConfig.headers = {};
        }
        Object.assign(allConfig.headers, createAuthHeaders(currentUser.token.access));
        try {
            const response = await axios.request<T>(allConfig);
            return response.data;
        } catch (e: any) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                currentUser = await refresh();
                Object.assign(allConfig.headers, createAuthHeaders(currentUser.token.access));
                const response = await axios.request<T>(allConfig);
                return response.data;
            } else {
                throw e;
            }
        }
    };

    const refresh = async (): Promise<AuthData> => {
        let refreshToken: string | null;
        if (user !== null) {
            refreshToken = user.token.refresh;
        } else {
            refreshToken = getSavedRefreshToken();
        }
        if (refreshToken === null) {
            throw new UnauthorizedError();
        }
        const currentUser = await internalAuthProvider.refresh(refreshToken);
        setUser(currentUser);
        localStorage.setItem('token', currentUser.token.access);
        return currentUser;
    };

    let value = {user, login, logout, register, request, refresh};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}