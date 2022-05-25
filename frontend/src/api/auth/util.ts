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

export class InvalidDataError extends Error {
    public data: any;

    constructor(msg: string, data: object) {
        super(msg);
        this.data = data;
        Object.setPrototypeOf(this, InvalidDataError.prototype);
    }
}

export class PermissionError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NetworkError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UnauthorizedError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ServerError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UnknownError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export function processHttpError(err: any): any {
    if (err instanceof AxiosError && err.code === 'ERR_NETWORK') {
        return new NetworkError();
    }
    if (err.response) {
        switch (err.response.status) {
            case 400:
                return new InvalidDataError('Invalid data', err.response.data);
            case 401:
                return new UnauthorizedError();
            case 403:
                return new PermissionError();
            case 404:
                return new NotFoundError();
            case 500:
            case 503:
                return new ServerError();
            default:
                return err;
        }
    } else if (err.request) {
        return new NetworkError();
    } else {
        return err;
    }
}