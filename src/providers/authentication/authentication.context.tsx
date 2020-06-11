import * as React from "react";
import { createContext, Dispatch, useReducer } from "react";
import {
  IAuthenticationState,
  IAuthenticationActionType,
} from "./authentication-types";
import { authenticationReducer } from "./authentication-reducer";
import { Context } from "react";
import { isPlatform } from "@ionic/react";

const initialState = {
  userName: isPlatform('mobileweb') ? 'novalid' : '',
  password: '',
} as IAuthenticationState;
export const AuthenticationStateContext = createContext(initialState);

export const AuthenticationDispatchContext: Context<Dispatch<IAuthenticationActionType>> = createContext<
  Dispatch<IAuthenticationActionType>
>(()=>{});

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authenticationReducer, initialState)

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthenticationDispatchContext.Provider>
    </AuthenticationStateContext.Provider>
  );
};

export default AuthenticationProvider;
