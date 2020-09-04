import { useContextValue } from "../../shared/hooks/use-context-value-hook"
import { IAuthenticationState, ISetAuthenticationValues, SET_USER, SET_AUTHENTICATION_VALUES } from "./authentication-types"
import { AuthenticationStateContext, AuthenticationDispatchContext } from "./authentication.context"
import { useContext } from "react"
import { useLongActionIndicatorActions } from "../long-action-indicator/long-action-indicator.hooks"

import { authenticateUser as authenticateUserService } from './authentication.api';
import { useGlobalSetupState } from "../global-setup/global-setup.hooks"

export const useAuthenticationState = (): IAuthenticationState => {
    return useContextValue<IAuthenticationState>('AuthenticationStateContext', AuthenticationStateContext)
}

export interface IUseAuthenticationActions {
    setAuthenticationValues: (authValues: ISetAuthenticationValues) => void;
    authenticateUser: (payload: ISetAuthenticationValues) => void;
}

export const useAuthenticationActions = (): IUseAuthenticationActions => {
    
    const { apiBaseURL } = useGlobalSetupState();
    const { showLoading, hideLoading, showErrorMessage } = useLongActionIndicatorActions();

    const dispatch = useContext(AuthenticationDispatchContext);

    if (dispatch === undefined) {
        throw new Error('useLongActionIndicatorDispatch context not defined');
    }

    const authenticateUser = async (payload: ISetAuthenticationValues) => {
        try {
            showLoading();
            const tkns = await authenticateUserService(payload, apiBaseURL);
            setUserToken(tkns);            
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
 
    const setAuthenticationValues = (authValues: ISetAuthenticationValues) => {
        dispatch({
            type: SET_AUTHENTICATION_VALUES,
            authValues
        });
    }
    return {
        setAuthenticationValues,
        authenticateUser
    };
}

export const useAuthentication = (): [IAuthenticationState, IUseAuthenticationActions] => {
    return [useAuthenticationState(), useAuthenticationActions()];
}

