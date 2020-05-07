import { ITicket } from "./lottery-tickets.contracts";

export const ADD_LOTTERY_TICKET = "ADD_LOTTERY_TICKET";
interface IAddLotteryTicket {
    type: typeof ADD_LOTTERY_TICKET
    payload: ITicket
}
export const addLotteryTicket = (ticket: ITicket): ActionType => {
    console.debug('addLotteryTicket comes');
    return ({
        type: ADD_LOTTERY_TICKET,
        payload: ticket
    });
}

export const REMOVE_LOTTERY_TICKET_SET = "REMOVE_LOTTERY_TICKET_SET";
interface IRemoveLotteryTicketSet {
    type: typeof REMOVE_LOTTERY_TICKET_SET
    payload: number[]
}
export const removeLotteryTicketSet = (ticketsIds: number[]): ActionType => {
    return ({
        type: REMOVE_LOTTERY_TICKET_SET,
        payload: ticketsIds
    });
}

export type ActionType = IAddLotteryTicket | IRemoveLotteryTicketSet;