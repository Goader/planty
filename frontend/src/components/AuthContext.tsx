import React from "react";
import {AuthData} from "../model/auth";
import {internalAuthProvider, removeTokens} from "../api/auth";

type AuthContextType = {
    user: AuthData | null,
    login: (username: string, password: string) => Promise<AuthData>,
    logout: () => void,
    register: (username: string, password: string) => Promise<AuthData>
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

    let value = {user, login, logout, register};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}