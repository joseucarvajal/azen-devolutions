export interface IUser {
    tkna:string;
}

export interface IAuthenticationState {
    userName: string;
    password: string;
    user: IUser;
}

export const SET_AUTHENTICATION_VALUES = 'SET_AUTHENTICATION_VALUES';
export interface ISetAuthenticationValues {
    userName:string;
    password:string;
}

export const SET_USER = 'SET_USER';

export type IAuthenticationActionType = 
    | { type: typeof SET_AUTHENTICATION_VALUES, authValues:ISetAuthenticationValues }
    | { type: typeof SET_USER, user:IUser }