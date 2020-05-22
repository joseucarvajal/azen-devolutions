import { 
    LongActionIndicatorType, 
    ILongActionIndicatorState, 
    START_LOADING, 
    STOP_LOADING,
    CLEAN_RESULT_MESSAGE,
} from "./long-action-indicator.types";

export const longActionIndicatorReducer = 
    (state: ILongActionIndicatorState, action: LongActionIndicatorType): ILongActionIndicatorState => {

    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                resultMessage: '',
                loadingMessage: action.loadingMessage ?? 'Por favor espere...',
                isLoading: true,
                messagePosition: 'bottom'
            };

        case STOP_LOADING:
            return {
                ...state,                
                status: action.options?.status ?? 'ok',                        
                resultMessage: action.options?.resultMessage ?? '',
                isLoading: false,
                messagePosition: action.options?.msgPosition ?? 'bottom'
            };

        case CLEAN_RESULT_MESSAGE:
            return {
                ...state,
                resultMessage: ''
            };

        default:
            return state;
    }
}