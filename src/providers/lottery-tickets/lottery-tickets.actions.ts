import { ITicket } from "./lottery-tickets.contracts";
import ActionType, * as Actions from "./lottery-tickets.types";

export const addLotteryTicket = (ticket: ITicket): ActionType => {
    return ({
        type: Actions.ADD_LOTTERY_TICKET,
        payload: ticket
    });
}

export const removeLotteryTicketSet = (ticketsIds: number[]): ActionType => {
    return ({
        type: Actions.REMOVE_LOTTERY_TICKET_SET,
        payload: ticketsIds
    });
}