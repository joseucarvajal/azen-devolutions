import { useContext } from "react";

import {
    LongActionIndicatorStateContext,
    LongActionIndicatorDispatchContext
} from "./long-action-indicator.context";

export const useLongActionIndicatorState = () => {
    const context = useContext(LongActionIndicatorStateContext);

    if (context === undefined) {
        throw new Error('LongActionIndicatorStateContext context not defined');
    }

    return context;
}

export const useLongActionIndicatorDispatch = () => {
    const context = useContext(LongActionIndicatorDispatchContext);

    if (context === undefined) {
        throw new Error('useLongActionIndicatorDispatch context not defined');
    }

    return context;
}

export const useLongActionIndicator = () => {    
    return {state: useLongActionIndicatorState(), dispatch:useLongActionIndicatorDispatch()};
}