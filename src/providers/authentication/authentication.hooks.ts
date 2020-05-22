import { useContextValue } from "../../shared/hooks/use-context-value-hook"
import { IAuthenticationState, ISetAuthenticationValues, SET_USER } from "./authentication-types"
import { AuthenticationStateContext, AuthenticationDispatchContext } from "./authentication.context"
import { useContext } from "react"
import { useLongActionIndicatorActions } from "../long-action-indicator/long-action-indicator.hooks"

import { authenticateUser as authenticateUserUtil } from './authentication.utils';

export const useAuthenticationState = (): IAuthenticationState => {
    return useContextValue<IAuthenticationState>('AuthenticationStateContext', AuthenticationStateContext)
}

export interface IUseAuthenticationActions {
    authenticateUser: (payload: ISetAuthenticationValues) => void;
}

export const useAuthenticationActions = (): IUseAuthenticationActions => {
    
    const { showLoading, hideLoading, showErrorMessage } = useLongActionIndicatorActions();

    const dispatch = useContext(AuthenticationDispatchContext);

    if (dispatch === undefined) {
        throw new Error('useLongActionIndicatorDispatch context not defined');
    }

    const authenticateUser = async (payload: ISetAuthenticationValues) => {
        try {
            showLoading();
            const tkna = await authenticateUserUtil(payload);
            setUserToken(tkna);
            hideLoading();
        }
        catch (err) {
            showErrorMessage(err.toString());
        }
    }

    const setUserToken = (tkna: string) => {
        dispatch({
            type: SET_USER,
            user: {
                tkna: tkna
            }
        });
    }

    return {
        authenticateUser
    };
}

export const useAuthentication = (): [IAuthenticationState, IUseAuthenticationActions] => {
    return [useAuthenticationState(), useAuthenticationActions()];
}

