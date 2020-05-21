export interface IAuthenticationState {
    userName: string;
    password: string;    
}

export const SET_AUTHENTICATION_VALUES = 'SET_AUTHENTICATION_VALUES';
export interface ISetAuthenticationValues {
    userName:string;
    password:string;
}

export type IAuthenticationActionType = 
    | { type: typeof SET_AUTHENTICATION_VALUES, payload:ISetAuthenticationValues };