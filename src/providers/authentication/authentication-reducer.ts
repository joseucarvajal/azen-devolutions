import { IAuthenticationState, IAuthenticationActionType, SET_AUTHENTICATION_VALUES } from "./authentication-types";

export const authenticationReducer = (state: IAuthenticationState, action: IAuthenticationActionType): IAuthenticationState => {

    switch (action.type) {

        case SET_AUTHENTICATION_VALUES:
            return {
                ...state,
                userName: action.payload.userName,
                password: action.payload.password
            };

        default:
            return state;
    }

}