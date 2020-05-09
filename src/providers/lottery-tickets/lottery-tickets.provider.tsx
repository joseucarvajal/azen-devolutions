import React, { createContext, useReducer, useContext } from "react";


import { IState, ILoteryTicketsContext } from "./lottery-tickets.contracts";
import { reducer } from "./lottery-tickets.reducer";

import { addLotteryTicket } from "./lottery-tickets.actions";

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

export const useTest = () => {
  const { state, dispatch } = useContext(LotteryTicketsContext);

  
  const fireAction = () => {    
    dispatch(
      addLotteryTicket({
        codigo: "90150004641830216701"
      })
    );

  }

  const addTicket = () => {
    console.log("state in list add ticket 1", state);
    fireAction();
    console.log("state in list add ticket 2", state);
    fireAction();
  };

  return [addTicket];

}
