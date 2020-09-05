import React, { createContext, useReducer, Dispatch, useEffect, useState } from "react";
import { GlobalSetupState, GlobalSetupActionType, INITIALIZE_STATE } from "./global-setup.types";
import { globalSetupReducer } from "./global-setup.reducer";
import { NativeStorage } from "@ionic-native/native-storage";



export const GlobalSetupDataContext = createContext<GlobalSetupState>({} as GlobalSetupState);

export const GlobalSetupActionsContext = createContext<
Dispatch<GlobalSetupActionType>
>(() => {});

const GlobalSetupProvider: React.FC = ({ children }) => {
  
  const [state, dispatch] = useReducer(globalSetupReducer, {} as GlobalSetupState);
  
  useEffect(()=>{
    (async ()=>{
      const initialStateFromStorage = await NativeStorage.getItem('GlobalSetupState');
      dispatch({
        type: INITIALIZE_STATE,
        state: initialStateFromStorage ?? {}
      });
    })();
  }, []);
  

  return (
    <GlobalSetupDataContext.Provider value={state}>
      <GlobalSetupActionsContext.Provider value={dispatch}>
        {children}
      </GlobalSetupActionsContext.Provider>
    </GlobalSetupDataContext.Provider>
  );
};

export default GlobalSetupProvider;
