import { useContext } from "react";

import {
    LongActionIndicatorStateContext,
    LongActionIndicatorDispatchContext
} from "./long-action-indicator.context";
import { 
    MsgPositionOptions, 
    START_LOADING, 
    STOP_LOADING, 
    CLEAN_RESULT_MESSAGE 
} from "./long-action-indicator.types";

export const useLongActionIndicatorState = () => {
    const context = useContext(LongActionIndicatorStateContext);

    if (context === undefined) {
        throw new Error('LongActionIndicatorStateContext context not defined');
    }

    return context;
}


export interface ILongActionIndicatorActions {
    showLoading: (loadingMessage?: string) => void;
    hideLoading: () => void;
    showErrorMessage: (message: string, position?: MsgPositionOptions) => void;
    showSuccessMessage: (message: string, position?: MsgPositionOptions) => void;
    hideMessage: () => void;
}
export const useLongActionIndicatorActions = () => {

    const dispatch = useContext(LongActionIndicatorDispatchContext);

    if (dispatch === undefined) {
        throw new Error('useLongActionIndicatorDispatch context not defined');
    }

    const showLoading = (loadingMessage?: string) => {
        dispatch({
            type: START_LOADING,
            loadingMessage
        });
    }

    const hideLoading = () => {
        dispatch({
            type: STOP_LOADING,
        });
    }

    const showErrorMessage = (message: string, msgPosition?: MsgPositionOptions) => {
        dispatch({
            type: STOP_LOADING,
            options: {
                resultMessage: message,
                status: 'error',
                msgPosition: msgPosition ?? 'bottom'
            }
        });
    }

    const showSuccessMessage = (message: string, msgPosition?: MsgPositionOptions) => {
        dispatch({
            type: STOP_LOADING,
            options: {
                resultMessage: message,
                status: 'ok',
                msgPosition: msgPosition ?? 'bottom'
            }
        });
    }

    const hideMessage = () => {
        dispatch({
            type: CLEAN_RESULT_MESSAGE,
        });
    }

    return {
        showLoading,
        hideLoading,
        showErrorMessage,
        showSuccessMessage,
        hideMessage
    } as ILongActionIndicatorActions;
}


export const useLongActionIndicator = () => {
    return {
        state: useLongActionIndicatorState(),
        actions: useLongActionIndicatorActions()
    };
}