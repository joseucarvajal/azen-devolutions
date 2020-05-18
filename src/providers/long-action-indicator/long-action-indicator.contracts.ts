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

