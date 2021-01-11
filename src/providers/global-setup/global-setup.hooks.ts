import { GlobalSetupState, SET_API_URL } from "./global-setup.types";
import {
  GlobalSetupDataContext,
  GlobalSetupActionsContext,
} from "./global-setup.context";
import { useContext, useEffect } from "react";
import { NativeStorage } from "@ionic-native/native-storage";

export const useGlobalSetupState = (): GlobalSetupState => {
  const state = useContext<GlobalSetupState>(GlobalSetupDataContext);
  useEffect(() => {
    (async () => {
        await NativeStorage.setItem("GlobalSetupState", state);
    })();

  }, [state]);

  return state;
};

interface IUseGlobalSetupStateActions {
  setApiBaseURL(apiBaseURL: string): void;
}

export const useGlobalSetupStateActions = (): IUseGlobalSetupStateActions => {
  const dispatch = useContext(GlobalSetupActionsContext);

  const setApiBaseURL = async (apiBaseURL: string) => {
    dispatch({
      type: SET_API_URL,
      value: apiBaseURL,
    });
  };

  return {
    setApiBaseURL,
  };
};

export const useGlobalSetup = (): [
  GlobalSetupState,
  IUseGlobalSetupStateActions
] => {
  return [useGlobalSetupState(), useGlobalSetupStateActions()];
};
