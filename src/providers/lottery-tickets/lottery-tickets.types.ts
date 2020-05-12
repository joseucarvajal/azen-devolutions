import { ITicketCounterReport } from "./lottery-tickets.contracts";

export const ADD_LOTTERY_TICKET = "ADD_LOTTERY_TICKET";
export interface IAddLotteryTicketParams {
    codigo:string
}
export interface IAddLotteryTicket {
    type: typeof ADD_LOTTERY_TICKET
    payload: IAddLotteryTicketParams
}

export const REMOVE_LOTTERY_TICKET_SET = "REMOVE_LOTTERY_TICKET_SET";
export interface IRemoveLotteryTicketSetParams {
    tickets: number[]
}
export interface IRemoveLotteryTicket {
    type: typeof REMOVE_LOTTERY_TICKET_SET
    payload: IRemoveLotteryTicketSetParams
}

export const SET_TIKET_COUNTER_REPORT = "SET_TIKET_COUNTER_REPORT";
export interface ISetTicketCounterReport {
    type: typeof SET_TIKET_COUNTER_REPORT
    payload: ITicketCounterReport
}

export type ActionType = IAddLotteryTicket | IRemoveLotteryTicket | ISetTicketCounterReport;
