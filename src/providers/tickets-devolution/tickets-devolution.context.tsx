import React, { createContext, useReducer, useState } from "react";

import {
  IState,
  ITicketsDevolutionContext,
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
} as IState;

let initialContext = {
  state: initialState,
  dispatch: () => {},
} as ITicketsDevolutionContext;

export const TicketsDevolutionContext = createContext(initialContext);

const TicketsDevolutionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  initialContext.state = initialState;
  initialContext.dispatch = dispatch;
  
  return (
    <TicketsDevolutionContext.Provider
      value={{ 
        state, 
        dispatch}}
    >
      {children}
    </TicketsDevolutionContext.Provider>
  );
};

export default TicketsDevolutionProvider;
