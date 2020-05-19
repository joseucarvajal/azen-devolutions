import { 
    LongActionIndicatorType, 
    ILongActionIndicatorState, 
    START_LOADING, 
    STOP_LOADING,
    HIDE_MESSAGE,
} from "./long-action-indicator.types";

export const longActionIndicatorReducer = 
    (state: ILongActionIndicatorState, action: LongActionIndicatorType): ILongActionIndicatorState => {

    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                resultMessage: '',
                loadingMessage: action.loadingMessage ? action.loadingMessage : 'Por favor espere...',
                isLoading: true,
                messagePosition: 'bottom'
            };

        case STOP_LOADING:
            return {
                ...state,                
                status: action.status ?? 'ok',                        
                resultMessage: action.resultMessage ?? '',
                isLoading: false,
                messagePosition: action.position ?? 'bottom'
            };

        case HIDE_MESSAGE:
            return {
                ...state,
                resultMessage: ''
            };

        default:
            return state;
    }
}