import React, { createContext, useReducer, useState } from "react";

import {
  IState,
  ITicketsDevolutionContext,
  ITicketDevolutionCounterReport,
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
  tickerCounterReport: {} as ITicketDevolutionCounterReport,
} as IState;

let initialContext = {
  state: initialState,
  dispatch: () => {},
  setTicketDevolutionCounterReport: (ticketCounterReport: ITicketDevolutionCounterReport) => {},
  ticketDevolutionCounterReport: {} as ITicketDevolutionCounterReport,
} as ITicketsDevolutionContext;

export const TicketsDevolutionContext = createContext(initialContext);

const TicketsDevolutionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [ticketDevolutionCounterReport, setTicketDevolutionCounterReport] = useState<
    ITicketDevolutionCounterReport
  >({} as ITicketDevolutionCounterReport);

  initialContext.state = initialState;
  initialContext.dispatch = dispatch;
  
  initialContext.ticketDevolutionCounterReport = ticketDevolutionCounterReport;
  initialContext.setTicketDevolutionCounterReport = setTicketDevolutionCounterReport;

  return (
    <TicketsDevolutionContext.Provider
      value={{ 
        state, 
        dispatch, 
        ticketDevolutionCounterReport: ticketDevolutionCounterReport, 
        setTicketDevolutionCounterReport: setTicketDevolutionCounterReport }}
    >
      {children}
    </TicketsDevolutionContext.Provider>
  );
};

export default TicketsDevolutionProvider;