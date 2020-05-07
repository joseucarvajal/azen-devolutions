import { ITicket } from "./lottery-tickets.contracts";

export const ADD_LOTTERY_TICKET = "ADD_LOTTERY_TICKET";
interface IAddLotteryTicket {
    type: typeof ADD_LOTTERY_TICKET
    payload: ITicket
}

export const REMOVE_LOTTERY_TICKET_SET = "REMOVE_LOTTERY_TICKET_SET";
interface IRemoveLotteryTicketSet {
    type: typeof REMOVE_LOTTERY_TICKET_SET
    payload: number[]
}

type ActionType = IAddLotteryTicket | IRemoveLotteryTicketSet;
export default ActionType;