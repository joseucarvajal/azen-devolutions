import React, { createContext, useReducer } from "react";

import { IState, ILoteryTicketsContext } from "./lottery-tickets.contracts";
import { reducer } from "./lottery-tickets.reducer";
import ActionType from "./lottery-tickets.types";

export const initialState = {
  fractions: {
    byId: {},
    allIds: [],
  },
  tickets: {
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
