import {
    GlobalSetupState,
    GlobalSetupActionType,
    SET_API_URL,
    INITIALIZE_STATE
} from "./global-setup.types";

export const globalSetupReducer = (state: GlobalSetupState, action: GlobalSetupActionType): GlobalSetupState => {
    switch (action.type) {

        case SET_API_URL:
            return {
                ...state,
                apiBaseURL: action.value
            };

        case INITIALIZE_STATE:
            return action.state;

        default:
            return state;
    }
}