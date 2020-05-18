import { 
    LongActionIndicatorType, 
    ILongActionIndicatorState, 
    IActionResultEnum,
    START_LOADING, 
    STOP_LOADING,
} from "./long-action-indicator.types";

export const longActionIndicatorReducer = 
    (state: ILongActionIndicatorState, action: LongActionIndicatorType): ILongActionIndicatorState => {

    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                resultMessage: '',
                loadingMessage: action.loadingMessage ? action.loadingMessage : 'Por favor espere...',
                isLoading: true
            };

        case STOP_LOADING:
            return {
                ...state,                
                status: action.status ? action.status : IActionResultEnum.OK,                        
                resultMessage: action.resultMessage ? action.resultMessage : '',
                isLoading: false,
            };

        default:
            return state;
    }
}