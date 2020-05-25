import React, { createContext, Dispatch, useReducer } from "react";
import {
  ITicketsEditorState,
  ITicketEditorAction,
} from "./tickets-editor.types";
import { ticketsEditorReducer } from "./tickets-editor.reducer";

export const initialState = {
  codigoTicketToEdit: "",
} as ITicketsEditorState;

export const TicketsEditorStateContext = createContext<ITicketsEditorState>(
  initialState
);

export const TicketsEditorDispatchContext = createContext<
  Dispatch<ITicketEditorAction>
>(() => {});

const TicketsEditorProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ticketsEditorReducer, initialState);

  return (
    <TicketsEditorStateContext.Provider value={state}>
      <TicketsEditorDispatchContext.Provider value={dispatch}>
        {children}
      </TicketsEditorDispatchContext.Provider>
    </TicketsEditorStateContext.Provider>
  );
};

export default TicketsEditorProvider;
