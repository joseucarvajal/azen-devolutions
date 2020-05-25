import { Dispatch, useState } from "react";
import { ITicketsEditorState, ITicketEditorAction, SET_CODIGO_TICKET_TO_EDIT } from "./tickets-editor.types";
import { useContextValue } from "../../shared/hooks/use-context-value-hook";
import { TicketsEditorStateContext, TicketsEditorDispatchContext } from "./tickets-editor.context";
import { useTicketDevolutionState } from "../tickets-devolution/tickets-devolution.hook";
import { ITicket } from "../tickets-devolution/tickets-devolution.types";
import { getTicketsOrderByReading } from "../tickets-devolution/tickets-devolution.utils";

export const useTicketEditorState = (): ITicketsEditorState => {
    return useContextValue<ITicketsEditorState>('TicketsEditorStateContext', TicketsEditorStateContext)
}

export const useTicketEditorDispatch = (): Dispatch<ITicketEditorAction> => {
    return useContextValue<Dispatch<ITicketEditorAction>>('TicketsEditorDispatchContext', TicketsEditorDispatchContext);
}


export interface IUseTicketEditor {
    ticketList: ITicket[];

    filterOutTickets: (searchNumber: string | undefined) => void;
    setSelectedTicket: (ticketCodigo: string) => void;
}
export const useTicketEditor = (): IUseTicketEditor => {

    const ticketsDevolutionState = useTicketDevolutionState();
    const ticketsEditorDispatch = useTicketEditorDispatch();

    const [ticketList, setTicketList] = useState<ITicket[]>([]);
    
    const filterOutTickets = (searchNumber: string | undefined) => {
        const ticketListByNumber = getTicketsOrderByReading(ticketsDevolutionState, searchNumber);
        setTicketList(ticketListByNumber);
    };

    const setSelectedTicket = (ticketCodigo: string) => {
        ticketsEditorDispatch({
            type: SET_CODIGO_TICKET_TO_EDIT,
            codigo: ticketCodigo
        });
    };

    return {
        ticketList,
        filterOutTickets,
        setSelectedTicket
    };
}