import React, { createContext, useReducer, Dispatch } from "react";

import {
  ITicketsDevolutionState,
  ActionType,
} from "./tickets-devolution.types";
import { reducer } from "./tickets-devolution.reducer";

export const initialState = {
  ticketsCounter: 0,
  codigoLoteria: "",
  sorteo: "",
  ticketsCounterCollection: {
    byId: {
      1: {
        codigo: 1,
        tickets: [],
      },
      2: {
        codigo: 2,
        tickets: [],
      },
      3: {
        codigo: 3,
        tickets: [],
      },
    },
    allIds: [1, 2, 3],
  },
  ticketsCollection: {
    byId: {},
    allIds: [],
  },
} as ITicketsDevolutionState;

export const TicketsDevolutionStateContext = createContext<ITicketsDevolutionState>(
  initialState
);

export const TicketsDevolutionDispatchContext = createContext<
  Dispatch<ActionType>
>(() => {});

const TicketsDevolutionProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TicketsDevolutionStateContext.Provider value={state}>
      <TicketsDevolutionDispatchContext.Provider value={dispatch}>
        {children}
      </TicketsDevolutionDispatchContext.Provider>
    </TicketsDevolutionStateContext.Provider>
  );
};

export default TicketsDevolutionProvider;
