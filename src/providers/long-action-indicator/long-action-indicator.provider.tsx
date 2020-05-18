import React, { createContext, useReducer } from "react";

import { ILongActionIndicatorState } from "./long-action-indicator.contracts";

import { IStartLoadingParams, IStopLoadingParams } from "./long-action-indicator.types";
import { longActionIndicatorReducer  } from "./long-action-indicator.reducer";

import { 
    startLoading as startLoadingAction,
    stopLoading as stopLoadingAction
} from "./long-action-indicator.actions";

export interface ILongActionIndicatorContext {
    state: ILongActionIndicatorState;
    startLoadingIndicator: (payload?: IStartLoadingParams) => void;
    stopLoadingIndicator: (payload?:IStopLoadingParams) => void;
}

export const initialContext = {
    state: {
        isLoading: false,
        loadingMessage: 'Por favor espere...'
    } as ILongActionIndicatorState,
    startLoadingIndicator: (payload: IStartLoadingParams) => { },
    stopLoadingIndicator: (payload?:IStopLoadingParams) => { },
} as ILongActionIndicatorContext;

export const LongActionIndicatorContext = createContext(initialContext);

const LongActionIndicatorProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(longActionIndicatorReducer, initialContext.state);
        
    const startLoading = (payload?:IStartLoadingParams) => {
        dispatch(startLoadingAction(payload));
    }
    
    const stopLoading = (payload?:IStopLoadingParams) => {
        dispatch(stopLoadingAction(payload));
    }
    
    initialContext.state = state;
    initialContext.startLoadingIndicator = startLoading;
    initialContext.stopLoadingIndicator = stopLoading;

    return (
        <LongActionIndicatorContext.Provider value={{
            state,
            startLoadingIndicator: startLoading,
            stopLoadingIndicator: stopLoading,            
        } as ILongActionIndicatorContext}>
            {children}
        </LongActionIndicatorContext.Provider>
    );
}

export default LongActionIndicatorProvider;