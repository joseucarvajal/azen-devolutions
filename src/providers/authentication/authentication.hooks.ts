import { useContextValue } from "../../shared/hooks/use-context-value-hook"
import { IAuthenticationState, IAuthenticationActionType, ISetAuthenticationValues } from "./authentication-types"
import { AuthenticationStateContext, AuthenticationDispatchContext } from "./authentication.context"
import { Dispatch } from "react"
import { useLongActionIndicatorDispatch } from "../long-action-indicator/long-action-indicator.hooks"
import { START_LOADING, STOP_LOADING } from "../long-action-indicator/long-action-indicator.types"

import { authenticateUser as authenticateUserUtil } from './authentication.utils';

export const useAuthenticationState = (): IAuthenticationState => {
    return useContextValue<IAuthenticationState>('AuthenticationStateContext', AuthenticationStateContext)
}

export const useAuthenticationDispatch = (): Dispatch<IAuthenticationActionType> => {
    return useContextValue<Dispatch<IAuthenticationActionType>>(
        'AuthenticationDispatchContext', AuthenticationDispatchContext)
}

export interface IUseAuthentication {
    state: IAuthenticationState;

    authenticateUser: (payload: ISetAuthenticationValues) => void;
    dispatch: Dispatch<IAuthenticationActionType>;
}

export const useAuthentication = (): IUseAuthentication => {

    const longActionInidicatorDispatch = useLongActionIndicatorDispatch();

    const authenticateUser = async (payload: ISetAuthenticationValues) => {
        try {
            longActionInidicatorDispatch({
                type: START_LOADING
            });

            await authenticateUserUtil(payload);

            longActionInidicatorDispatch({
                type: STOP_LOADING
            });
        }
        catch (err) {
            longActionInidicatorDispatch({
                type: STOP_LOADING,
                status: 'error',
                resultMessage: err.toString()
            });
        }
    }

    return {
        state: useAuthenticationState(),

        authenticateUser: authenticateUser,
        dispatch: useAuthenticationDispatch(),
    };
}

