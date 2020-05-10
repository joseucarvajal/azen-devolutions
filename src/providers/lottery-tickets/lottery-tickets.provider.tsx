import React, { createContext, useReducer } from "react";


import { IState, ILoteryTicketsContext } from "./lottery-tickets.contracts";
import { reducer } from "./lottery-tickets.reducer";

export const initialState = {
  ticketsCounter:0,
  codigoLoteria: '',
  sorteo: '',
  ticketsCounterCollection: {
    byId: {},
    allIds: [],
  },
  ticketsCollection: {
    byId: {},
    allIds: [],
  },
} as IState;

let initialContext = {
  state: initialState,
  dispatch: () => {},
} as ILoteryTicketsContext;

export const LotteryTicketsContext = createContext(initialContext);

const LotteryTicketProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  initialContext.state = state;
  initialContext.dispatch = dispatch;

  return (
    <LotteryTicketsContext.Provider value={{ state, dispatch }}>
      {children}
    </LotteryTicketsContext.Provider>
  );
};

export default LotteryTicketProvider;