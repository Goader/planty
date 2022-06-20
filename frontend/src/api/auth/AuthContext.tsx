import React, {useCallback, useMemo, useState} from "react";
import {AuthData} from "../../model/auth";
import {AxiosRequestConfig} from "axios";
import {internalAuthProvider} from "./auth";
import {getSavedRefreshToken, removeTokens, UnauthorizedError} from "./util";

type AuthContextType = {
    user: AuthData | null,
    login: (username: string, password: string) => Promise<AuthData>,
    logout: () => void,
    register: (username: string, email: string, password: string) => Promise<AuthData>,
    request: <T, >(config: AxiosRequestConfig) => Promise<T>,
    refresh: () => Promise<AuthData>,
    pendingRefresh: boolean
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = useState<AuthData | null>(null);
    let [pendingRefresh, setPendingRefresh] = useState(true);

    const login = useCallback(async (username: string, password: string) => {
        let user = await internalAuthProvider.login(username, password);
        setUser(user);
        setPendingRefresh(false);
        return user;
    }, []);

    const logout = useCallback(() => {
        removeTokens();
        setUser(null);
    }, []);

    const register = useCallback(async (username: string, email: string, password: string) => {
        let user = await internalAuthProvider.register(username, email, password);
        setUser(user);
        setPendingRefresh(false);
        return user;
    }, []);

    const request = useCallback(async <T, >(config: AxiosRequestConfig): Promise<T> => {
        if (user === null) {
            setPendingRefresh(true);
            throw new UnauthorizedError();
        }

        try {
            return await internalAuthProvider.request<T>(config, user.token.access);
        } catch (e: any) {
            if (e instanceof UnauthorizedError) {
                setPendingRefresh(true);
            }
            throw e;
        }
    }, [user]);

    const refresh = useCallback(async (): Promise<AuthData> => {
        setPendingRefresh(false);
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
    }, [user]);

    let value = useMemo<AuthContextType>(() => {
        return {user, login, logout, register, request, refresh, pendingRefresh: pendingRefresh};
    }, [login, logout, refresh, pendingRefresh, register, request, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}