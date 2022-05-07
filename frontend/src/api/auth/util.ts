import {AxiosError, AxiosRequestHeaders} from "axios";


export function getSavedAccessToken() {
    return localStorage.getItem('token');
}

export function getSavedRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function removeTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}

export function createAuthHeaders(accessToken: string): AxiosRequestHeaders {
    return {
        Authorization: `Bearer ${accessToken}`
    };
}

export class RegisterInputError extends Error {
    public errors: any;

    constructor(msg: string, errors: object) {
        super(msg);
        this.errors = errors;
        Object.setPrototypeOf(this, RegisterInputError.prototype);
    }
}

export class UnauthorizedError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export function isErrorUnauthorized(err: any): boolean {
    return err.message === 'unauthorized' || (err instanceof AxiosError && err.response?.status === 401) || (err instanceof UnauthorizedError);
}


export function handleUnauthorized(err: any, callback: () => void) {
    if (isErrorUnauthorized(err)) {
        callback();
    } else {
        throw err;
    }
}