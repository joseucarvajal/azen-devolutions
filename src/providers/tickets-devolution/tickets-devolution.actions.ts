import { 
    ActionType,

    ADD_LOTTERY_TICKET,
    IAddLotteryTicketParams,

    REMOVE_LOTTERY_TICKET_SET,
    IRemoveLotteryTicketSetParams,
    SET_NEW_TICKET_DEVOLUTION_STATE

 } from "./tickets-devolution.types";
import { IState } from "./tickets-devolution.contracts";
 
 export const addLotteryTicket = (payload: IAddLotteryTicketParams): ActionType => {
     return ({
         type: ADD_LOTTERY_TICKET,
         payload
     });
 }
 
export const removeLotteryTicketSet = (payload: IRemoveLotteryTicketSetParams): ActionType => {
    return ({
        type: REMOVE_LOTTERY_TICKET_SET,
        payload
    });
}

export const setNewTicketDevolutionState = (payload: IState): ActionType => {
    return ({
        type: SET_NEW_TICKET_DEVOLUTION_STATE,
        payload
    });
}