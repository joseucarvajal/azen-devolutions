import React, { createContext, useReducer } from "react";

import IState, { IFraction, ITicket } from "./lottery-tickets.contracts";
import { reducer } from "./lottery-tickets.reducer";
import { INormalizedEntity } from "../../shared/contracts/shared.contracts";

export interface ILoteryTicketsContext {
  state: IState;
  dispatch: any;
}

let initialContext = {
  state: {
    ticketsCount: 0,
    fractions: {
      byId: {},
      allIds: []
    },
    tickets: {
      byId: {},
      allIds: []
    }
  },
  dispatch: () => {},
} as ILoteryTicketsContext;

export const LotteryTicketsContext = createContext(initialContext);

const LotteryTicketProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialContext.state);
  initialContext.state = state;
  initialContext.dispatch = dispatch;

  return (
    <LotteryTicketsContext.Provider value={{ state, dispatch }}>
      {children}
    </LotteryTicketsContext.Provider>
  );
};

export default LotteryTicketProvider;
