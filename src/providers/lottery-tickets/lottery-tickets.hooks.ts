import { useContext, useEffect } from "react";
import { IState, ITicketCounterReport } from "./lottery-tickets.contracts";
import { addLotteryTicket } from "./lottery-tickets.actions";
import { LotteryTicketsContext } from "./lottery-tickets.provider";
import { IAddLotteryTicketParams } from "./lottery-tickets.types";

import { getTicketCounterReport as utilsGetTicketCounterReport } from "./lottery-tickets.utils";

export interface IUseLotteryTickets {
    state: IState;
    ticketCounterReport: ITicketCounterReport;

    addTicket: (params: IAddLotteryTicketParams) => void;
    updateReport: () => void;
}

export const useLotteryTickets = (agente:string): IUseLotteryTickets => {

    const { state, dispatch, setTicketCounterReport, ticketCounterReport } = useContext(LotteryTicketsContext);

    useEffect(() => {
        updateReport(agente);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const addTicket = (params: IAddLotteryTicketParams) => {
        dispatch(
            addLotteryTicket(params)
        );
    };

    const updateReport = (agente:string)=>{
        const newTicketCounterReport = utilsGetTicketCounterReport(state, agente);
        setTicketCounterReport(newTicketCounterReport);
    };

    return {
        state,
        ticketCounterReport,
        addTicket,
        updateReport,
    } as IUseLotteryTickets;
}