export enum IActionResultEnum  {
    OK,
    ERROR,    
}

export interface ILongActionIndicatorState {
    isLoading:boolean;
    status: IActionResultEnum;
    loadingMessage: string;
    resultMessage: string;
}

export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export type LongActionIndicatorType =
    | { type: typeof START_LOADING, loadingMessage?: string }
    | { type: typeof STOP_LOADING, status?: IActionResultEnum; resultMessage?: string; }
    