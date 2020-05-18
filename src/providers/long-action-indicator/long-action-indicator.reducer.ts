import { ILongActionIndicatorState, IActionResultEnum } from "./long-action-indicator.contracts";
import { ActionType, START_LOADING, STOP_LOADING } from "./long-action-indicator.types";

export const longActionIndicatorReducer = (state: ILongActionIndicatorState, action: ActionType): ILongActionIndicatorState => {

    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                resultMessage: '',
                loadingMessage: action.payload
                    ? action.payload.loadingMessage ? action.payload.loadingMessage : 'Por favor espere...'
                    : 'Por favor espere...',
                isLoading: true
            };

        case STOP_LOADING:
            return {
                ...state,
                status: action.payload 
                        ? action.payload.status ? action.payload.status : IActionResultEnum.OK
                        : IActionResultEnum.OK,
                resultMessage: action.payload
                    ? action.payload.resultMessage ? action.payload.resultMessage : ''
                    : '',
                isLoading: false,
            };

        default:
            return state;
    }
}