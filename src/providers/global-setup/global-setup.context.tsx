import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useState,
} from "react";
import {
  GlobalSetupState,
  GlobalSetupActionType,
  INITIALIZE_STATE,
} from "./global-setup.types";
import { globalSetupReducer } from "./global-setup.reducer";
import { NativeStorage } from "@ionic-native/native-storage";
import { isPlatform } from "@ionic/react";

export const GlobalSetupDataContext = createContext<GlobalSetupState>(
  {} as GlobalSetupState
);

export const GlobalSetupActionsContext = createContext<
  Dispatch<GlobalSetupActionType>
>(() => {});

const GlobalSetupProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    globalSetupReducer,
    {} as GlobalSetupState
  );

  useEffect(() => {
    let initialStateFromStorage = {} as GlobalSetupState;
    (async () => {
      try {
        initialStateFromStorage = await NativeStorage.getItem(
          "GlobalSetupState"
        );
      } catch (e) {
        if (isPlatform("mobileweb")) {
          initialStateFromStorage.apiBaseURL = "http://52.42.49.101:8080/";
        }
      } finally {
        dispatch({
          type: INITIALIZE_STATE,
          state: initialStateFromStorage,
        });
      }
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
