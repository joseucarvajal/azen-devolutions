import ActionType, * as Actions from "./lottery-tickets.types";

export const addLotteryTicket = (codigo: string): ActionType => {
    return ({
        type: Actions.ADD_LOTTERY_TICKET,
        payload: codigo
    });
}

export const removeLotteryTicketSet = (ticketsIds: number[]): ActionType => {
    return ({
        type: Actions.REMOVE_LOTTERY_TICKET_SET,
        payload: ticketsIds
    });
}