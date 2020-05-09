import { IState, ITicket } from "./lottery-tickets.contracts";
import {

    ActionType,
    ADD_LOTTERY_TICKET,

} from "./lottery-tickets.types";

import { getTicketFromCode as buildTicketFromCode } from "./lottery-tickets.utils";
import { ISTringIndexEntity } from "../../shared/contracts/shared.contracts";

export const reducer = (state: IState, action: ActionType): IState => {

    switch (action.type) {
        case ADD_LOTTERY_TICKET: //It receives the entire ticket code

            if (!action.payload.codigo || action.payload.codigo.length !== 20) {
                return state;
            }

            let ticketsCounter = state.ticketsCounter;
            const newTicket = buildTicketFromCode(action.payload.codigo, ticketsCounter);

            let existingTicketToRemoveFromCounterIndex = -1;
            let existingFractionTickets: string[] = [];
            let ticketsCollection: ISTringIndexEntity<ITicket> = state.ticketsCollection.byId;

            const existingTicket = state.ticketsCollection.byId[action.payload.codigo.substr(0, action.payload.codigo.length - 2)];

            if (existingTicket) {

                if (existingTicket.fraccion === newTicket.fraccion) {
                    return state;
                }

                //Removes existing item from state
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                let { [existingTicket.codigo]: removedItems, ...ticketsCollection } = state.ticketsCollection.byId;
                existingTicketToRemoveFromCounterIndex = state.ticketsCounterCollection.byId[existingTicket.cantidadFracciones].tickets.indexOf(existingTicket.codigo);
                existingFractionTickets = state.ticketsCounterCollection.byId[existingTicket.cantidadFracciones].tickets;
            }
            else { //new ticket
                ticketsCounter = state.ticketsCounter + 1;
                newTicket.readingOrder = ticketsCounter;
            }

            const counterObj = state.ticketsCounterCollection.byId[newTicket.cantidadFracciones];

            return {
                ...state,
                ticketsCounter,
                ticketsCounterCollection: {
                    byId: counterObj
                        ? {  //Counter already exists
                            ...state.ticketsCounterCollection.byId,
                            [newTicket.cantidadFracciones]: {
                                ...counterObj,
                                tickets: [...counterObj.tickets, newTicket.codigo]
                            }
                        }
                        : //Counter doesn't exist
                        existingTicket
                            ? //Ticket already exists
                            {
                                ...state.ticketsCounterCollection.byId,
                                [newTicket.cantidadFracciones]: {
                                    codigo: newTicket.cantidadFracciones,
                                    tickets: [newTicket.codigo]
                                },
                                [existingTicket?.cantidadFracciones]: {
                                    ...state.ticketsCounterCollection.byId[existingTicket.cantidadFracciones],
                                    tickets: [...existingFractionTickets.slice(0, existingTicketToRemoveFromCounterIndex),
                                    ...existingFractionTickets.slice(existingTicketToRemoveFromCounterIndex + 1, existingFractionTickets.length)]
                                }
                            }
                            : //Ticket doesn't exists
                            {
                                ...state.ticketsCounterCollection.byId,
                                [newTicket.cantidadFracciones]: {
                                    codigo: newTicket.cantidadFracciones,
                                    tickets: [newTicket.codigo]
                                }
                            },
                    allIds: counterObj ? state.ticketsCounterCollection.allIds : [...state.ticketsCounterCollection.allIds, newTicket.cantidadFracciones]
                },
                ticketsCollection: {
                    byId: existingTicket
                        ? //Ticket exists
                        {
                            ...ticketsCollection,
                            [newTicket.codigo]: newTicket
                        }
                        : //Ticket doesn't exist
                        { 
                            ...state.ticketsCollection.byId, 
                            [newTicket.codigo]: newTicket 
                        },
                    allIds: existingTicket ? state.ticketsCollection.allIds : [...state.ticketsCollection.allIds, newTicket.codigo]
                }
            };

        default:
            return state;
    }
}