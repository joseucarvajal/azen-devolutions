import React, { createContext, useReducer, useMemo } from "react";

import {
  IStateContext,
  IDispatchContext,
} from "../../shared/contracts/shared.contracts";

import {
  LongActionIndicatorType,
  ILongActionIndicatorState,
} from "./long-action-indicator.types";
import { longActionIndicatorReducer } from "./long-action-indicator.reducer";

export const initialState = {
  resultMessage: "",
  isLoading: false,
  loadingMessage: "Por favor espere...",
} as ILongActionIndicatorState;

export const LongActionIndicatorStateContext = createContext<
  IStateContext<ILongActionIndicatorState>
>({ state: initialState });

export const LongActionIndicatorDispatchContext = createContext<
  IDispatchContext<LongActionIndicatorType> | undefined
>(undefined);

const LongActionIndicatorProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    longActionIndicatorReducer,
    initialState
  );


  const stateValue = { state };
  
  const dispatchValue = useMemo(() => {
    return { dispatch };
  }, []);  

  //const dispatchValue = { dispatch };

  return (
    <LongActionIndicatorStateContext.Provider value={stateValue}>
      <LongActionIndicatorDispatchContext.Provider value={dispatchValue}>
        {children}
      </LongActionIndicatorDispatchContext.Provider>
    </LongActionIndicatorStateContext.Provider>
  );
};

export default LongActionIndicatorProvider;
