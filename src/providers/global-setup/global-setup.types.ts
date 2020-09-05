export class GlobalSetupState {
    apiBaseURL: string = '';
}

export const INITIALIZE_STATE = 'INITIALIZE_STATE';
export const SET_API_URL = 'SET_API_URL';

export type GlobalSetupActionType =
    { type: typeof SET_API_URL, value: string } |
    { type: typeof INITIALIZE_STATE, state:GlobalSetupState };