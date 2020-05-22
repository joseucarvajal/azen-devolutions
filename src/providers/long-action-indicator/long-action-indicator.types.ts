//string literal type
export type Resultptions = "ok" | "error";
export type MsgPositionOptions = "bottom" | "top";

export interface ILongActionIndicatorState {
    isLoading: boolean;
    status: Resultptions;
    loadingMessage: string;
    resultMessage: string;
    messagePosition: MsgPositionOptions
}

export const START_LOADING = "START_LOADING";
export interface IHideLoading {
    status?: Resultptions;
    resultMessage?: string; 
    msgPosition?: MsgPositionOptions
}

export const STOP_LOADING = "STOP_LOADING";
export const CLEAN_RESULT_MESSAGE = "HIDE_MESSAGE";

export type LongActionIndicatorType =
    | { type: typeof START_LOADING, loadingMessage?: string }
    | {
        type: typeof STOP_LOADING,
        options?:IHideLoading
    }
    | { type: typeof CLEAN_RESULT_MESSAGE }
