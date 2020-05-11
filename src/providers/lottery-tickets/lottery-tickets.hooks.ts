import { useContext, useEffect, useState } from "react";
import { IState } from "./lottery-tickets.contracts";
import { addLotteryTicket } from "./lottery-tickets.actions";
import { LotteryTicketsContext } from "./lottery-tickets.provider";
import { IAddLotteryTicketParams } from "./lottery-tickets.types";

export interface IUseLotteryTickets {
    state: IState,
    addTicket: (params: IAddLotteryTicketParams) => void,
}

export const useLotteryTickets = (): IUseLotteryTickets => {

    const { state, dispatch } = useContext(LotteryTicketsContext);

    useEffect(() => {
        console.log('refresh useLotteryTickets hook', state);
    }, [state]);

    const addTicket = (params: IAddLotteryTicketParams) => {
        dispatch(
            addLotteryTicket(params)
        );
    };

    return {
        state,
        addTicket,
    } as IUseLotteryTickets;
}