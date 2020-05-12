import React, { createContext, useReducer, useState } from "react";

import {
  IState,
  ILoteryTicketsContext,
  ITicketCounterReport,
} from "./lottery-tickets.contracts";
import { reducer } from "./lottery-tickets.reducer";

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
  tickerCounterReport: {} as ITicketCounterReport,
} as IState;

let initialContext = {
  state: initialState,
  dispatch: () => {},
  setTicketCounterReport: (ticketCounterReport: ITicketCounterReport) => {},
  ticketCounterReport: {} as ITicketCounterReport,
} as ILoteryTicketsContext;

export const LotteryTicketsContext = createContext(initialContext);

const LotteryTicketProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [ticketCounterReport, setTicketCounterReport] = useState<
    ITicketCounterReport
  >({} as ITicketCounterReport);

  initialContext.state = initialState;
  initialContext.dispatch = dispatch;
  
  initialContext.ticketCounterReport = ticketCounterReport;
  initialContext.setTicketCounterReport = setTicketCounterReport;

  return (
    <LotteryTicketsContext.Provider
      value={{ 
        state, 
        dispatch, 
        ticketCounterReport, 
        setTicketCounterReport }}
    >
      {children}
    </LotteryTicketsContext.Provider>
  );
};

export default LotteryTicketProvider;
