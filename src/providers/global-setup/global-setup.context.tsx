import React, { createContext, useReducer } from "react";
import { GlobalSetupState } from "./global-setup.types";
import { globalSetupReducer } from "./global-setup.reducer";

const initialState = {
  apiBaseURL: "http://52.42.49.101:8080",
} as GlobalSetupState;

export const GlobalSetupDataContext = createContext(initialState);

const GlobalSetupProvider: React.FC = ({children}) => {

  const [state] = useReducer(globalSetupReducer, initialState);

  return (
    <GlobalSetupDataContext.Provider
      value={state}
    >
        {children}
    </GlobalSetupDataContext.Provider>
  );
};

export default GlobalSetupProvider;
