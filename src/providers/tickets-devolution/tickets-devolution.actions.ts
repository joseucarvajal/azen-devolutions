import { 
    ActionType,

    ADD_LOTTERY_TICKET,
    IAddLotteryTicketParams,

    REMOVE_LOTTERY_TICKET_SET,
    IRemoveLotteryTicketSetParams,

 } from "./tickets-devolution.types";

 
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