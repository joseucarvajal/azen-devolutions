//string literal type
type Resultptions = "ok" | "error";
type PositionOptions = "bottom" | "top";

export interface ILongActionIndicatorState {
    isLoading:boolean;
    status: Resultptions;
    loadingMessage: string;
    resultMessage: string;
    messagePosition: PositionOptions
}

export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

export type LongActionIndicatorType =
    | { type: typeof START_LOADING, loadingMessage?: string }
    | { type: typeof STOP_LOADING, status?: Resultptions; resultMessage?: string; position?:PositionOptions }
    | { type: typeof HIDE_MESSAGE }
    