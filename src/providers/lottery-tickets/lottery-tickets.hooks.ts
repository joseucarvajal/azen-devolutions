import { useContext } from "react";
import { addLotteryTicket } from "./lottery-tickets.actions";
import { LotteryTicketsContext } from "./lottery-tickets.provider";
import { IState } from "./lottery-tickets.contracts";

export interface IUseLotteryTickets {
    state:IState,
    addTicket: (codigo:string)=>void
}

export const useLotteryTickets = (): IUseLotteryTickets => {

    const { state, dispatch } = useContext(LotteryTicketsContext);

    const addTicket = (codigo:string) => {
        dispatch(
            addLotteryTicket({
                codigo
            })
        );
    };

    return {
        state,
        addTicket
    } as IUseLotteryTickets;
}
