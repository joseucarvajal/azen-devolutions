import { IState } from "./tickets-devolution.contracts";

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

export const SET_NEW_TICKET_DEVOLUTION_STATE = "SET_NEW_TICKET_DEVOLUTION_STATE";
export interface ISetNewState {
    type: typeof SET_NEW_TICKET_DEVOLUTION_STATE
    payload: IState
}

export type ActionType = IAddLotteryTicket | IRemoveLotteryTicket | ISetNewState;
