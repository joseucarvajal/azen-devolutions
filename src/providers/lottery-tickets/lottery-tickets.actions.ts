import { ITicketCounterReport } from "./lottery-tickets.contracts";

import { 
    ActionType,

    ADD_LOTTERY_TICKET,
    IAddLotteryTicketParams,

    REMOVE_LOTTERY_TICKET_SET,
    IRemoveLotteryTicketSetParams,
    SET_TIKET_COUNTER_REPORT,

 } from "./lottery-tickets.types";

 
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

export const setTicketCounterReport = (payload: ITicketCounterReport): ActionType => {
    return ({
        type: SET_TIKET_COUNTER_REPORT,
        payload
    });
}