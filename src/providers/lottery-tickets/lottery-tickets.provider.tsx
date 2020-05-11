import React, { createContext, useReducer } from "react";


import { IState, ILoteryTicketsContext } from "./lottery-tickets.contracts";
import { reducer } from "./lottery-tickets.reducer";

export const initialState = {
  ticketsCounter:0,
  codigoLoteria: '',
  sorteo: '',
  ticketsCounterCollection: {
    byId: {
      1:{
        codigo: 1,
        tickets: []
      },
      2:{
        codigo: 2,
        tickets: []
      },
      3:{
        codigo: 3,
        tickets: []
      }
    },
    allIds:[1, 2, 3]
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

  initialContext.state = initialState;
  initialContext.dispatch = dispatch;

  return (
    <LotteryTicketsContext.Provider value={{ state, dispatch }}>
      {children}
    </LotteryTicketsContext.Provider>
  );
};

export default LotteryTicketProvider;