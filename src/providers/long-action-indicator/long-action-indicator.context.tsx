import React, { createContext, useReducer } from "react";

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
  ILongActionIndicatorState
>(initialState);

export const LongActionIndicatorDispatchContext = createContext<
  React.Dispatch<LongActionIndicatorType> | undefined
>(undefined);

const LongActionIndicatorProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    longActionIndicatorReducer,
    initialState
  );  

  return (
    <LongActionIndicatorStateContext.Provider value={state}>
      <LongActionIndicatorDispatchContext.Provider value={dispatch}>
        {children}
      </LongActionIndicatorDispatchContext.Provider>
    </LongActionIndicatorStateContext.Provider>
  );
};

export default LongActionIndicatorProvider;
