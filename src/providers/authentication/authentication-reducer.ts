import { IAuthenticationState, IAuthenticationActionType, SET_AUTHENTICATION_VALUES, SET_USER } from "./authentication-types";

export const authenticationReducer = (state: IAuthenticationState, action: IAuthenticationActionType): IAuthenticationState => {

    switch (action.type) {

        case SET_AUTHENTICATION_VALUES:
            return {
                ...state,
                userName: action.authValues.userName,
                password: action.authValues.password
            };

        case SET_USER:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }

}