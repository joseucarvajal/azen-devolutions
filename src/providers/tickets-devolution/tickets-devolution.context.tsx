import React, { createContext, useReducer, useMemo } from "react";

import { IState, ITicketsDevolutionContext } from "./tickets-devolution.types";
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
} as IState;

export const TicketsDevolutionContext = createContext<
  ITicketsDevolutionContext
>({} as ITicketsDevolutionContext);

const TicketsDevolutionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <TicketsDevolutionContext.Provider value={value}>
      {children}
    </TicketsDevolutionContext.Provider>
  );
};

export default TicketsDevolutionProvider;
