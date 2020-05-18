import { IActionResultEnum } from "./long-action-indicator.contracts";

export const START_LOADING = "START_LOADING";
export interface IStartLoading {
    type: typeof START_LOADING
    payload: IStartLoadingParams
}
export interface IStartLoadingParams {
    loadingMessage?: string;    
}

export const STOP_LOADING = "STOP_LOADING";
export interface IStopLoading {
    type: typeof STOP_LOADING
    payload: IStopLoadingParams
}
export interface IStopLoadingParams {
    status?: IActionResultEnum;
    resultMessage?: string;
}

export type ActionType = IStartLoading | IStopLoading;