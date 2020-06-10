import { Dispatch, useState, useEffect } from "react";
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

    searchNumber: string | undefined;
    setSearchNumber: (searchNumber: string | undefined) => void;

    setSelectedTicket: (ticketCodigo: string) => void;
}
export const useTicketEditor = (counterToEdit:number): IUseTicketEditor => {

    const [ticketList, setTicketList] = useState<ITicket[]>([]);
    const [searchNumber, setSearchNumber] = useState<string | undefined>(undefined);
    const ticketsDevolutionState = useTicketDevolutionState();
    const ticketsEditorDispatch = useTicketEditorDispatch();

    useEffect(() => {
        const ticketListByNumber = getTicketsOrderByReading(ticketsDevolutionState, searchNumber, counterToEdit);
        setTicketList(ticketListByNumber);
    }, [ticketsDevolutionState, searchNumber, counterToEdit]);

    const setSelectedTicket = (ticketCodigo: string) => {
        ticketsEditorDispatch({
            type: SET_CODIGO_TICKET_TO_EDIT,
            codigo: ticketCodigo
        });
    };

    return {
        ticketList,
        searchNumber,
        setSearchNumber,
        setSelectedTicket
    };
}