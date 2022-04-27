import {RegisterResponse, TokenPair, UserData} from "../model/auth";
import axios from "axios";

const url = 'http://localhost:3001/users/'

export function getSavedAccessToken() {
    return localStorage.getItem('token');
}

export function getSavedRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function isAccessTokenSaved() {
    return getSavedAccessToken() != null;
}


export async function fetchCurrentUser(): Promise<UserData> {
    const token = getSavedAccessToken();
    if (token === null) {
        throw new Error('unauthorized');
    }
    const response = await axios.get<UserData>(url + 'current_user/', {
        headers: {
            Authorization: `JWT ${getSavedAccessToken()}`
        }
    })
    if (response.status == 401) {
        throw new Error('unauthorized');
    }
    return response.data;
}

export async function login(username: string, password: string): Promise<UserData> {
    const response = await axios.post<TokenPair>(url + 'token/', {
        username: username,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.status == 401) {
        throw new Error('unauthorized')
    }
    const tokenPair = response.data;
    localStorage.setItem('token', tokenPair.access);
    localStorage.setItem('refreshToken', tokenPair.refresh)
    return await fetchCurrentUser();
}

export async function register(username: string, password: string): Promise<RegisterResponse> {
    console.log('register')
    const response = await axios.post<RegisterResponse>(url + 'signup/', {
        username: username,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 400) {
        throw new Error('invalid_input');
    }
    return response.data;
}