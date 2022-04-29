export type UserData = {
    username: string
}

export type TokenPair = {
    access: string,
    refresh: string
}

export type AuthData = UserData & TokenPair