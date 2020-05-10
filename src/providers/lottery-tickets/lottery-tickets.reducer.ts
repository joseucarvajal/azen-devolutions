import { IState } from "./lottery-tickets.contracts";
import {

    ActionType,
    ADD_LOTTERY_TICKET,

} from "./lottery-tickets.types";

import { getTicketFromCode as buildTicketFromCode } from "./lottery-tickets.utils";

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

            const existingTicket = state.ticketsCollection.byId[action.payload.codigo.substr(0, action.payload.codigo.length - 2)];

            if (existingTicket) {

                if (existingTicket.fraccion === newTicket.fraccion) {
                    return state;
                }

                //Removes existing item from state
                //let { [existingTicket.codigo]: removedItems, ...updatedTicketsCollection } = state.ticketsCollection.byId;

                existingTicketToRemoveFromCounterIndex = state.ticketsCounterCollection.byId[existingTicket.cantidadFracciones].tickets.indexOf(existingTicket.codigo);
                existingFractionTickets = state.ticketsCounterCollection.byId[existingTicket.cantidadFracciones].tickets;
            }
            else { //new ticket
                ticketsCounter = state.ticketsCounter + 1;
                newTicket.readingOrder = ticketsCounter;
            }

            //console.log('newticket', newTicket);
            let existingCounter = state.ticketsCounterCollection.byId[newTicket.cantidadFracciones];

            //Scanning repeated ticket into existing counter
            let existingTicketIndex = -1;
            if (existingTicket && existingCounter) {
                existingCounter = state.ticketsCounterCollection.byId[existingTicket.cantidadFracciones];
                existingTicketIndex = existingCounter.tickets.indexOf(existingTicket.codigo);            
            }

            return {
                ...state,
                ticketsCounter,
                ticketsCounterCollection: {
                    byId: existingCounter
                        ? {  //Counter already exists                            
                            ...state.ticketsCounterCollection.byId,
                            [existingCounter.codigo]: {
                                ...state.ticketsCounterCollection.byId[existingCounter.codigo],
                                tickets: [
                                    ...state.ticketsCounterCollection.byId[existingCounter.codigo].tickets.slice(0, existingTicketIndex),
                                    ...state.ticketsCounterCollection.byId[existingCounter.codigo].tickets.slice(existingTicketIndex + 1, state.ticketsCounterCollection.byId[existingCounter.codigo].tickets.length)
                                ]
                            },
                            [newTicket.cantidadFracciones]: {
                                ...state.ticketsCounterCollection.byId[newTicket.cantidadFracciones],
                                tickets: existingTicketIndex === -1
                                    ?   //repeated ticket doesn't exists
                                        [...existingCounter.tickets, newTicket.codigo] //ticket doesn't exists
                                    :   //repeated ticket already exists
                                        [...state.ticketsCounterCollection.byId[newTicket.cantidadFracciones].tickets, existingTicket.codigo] //ticket exists
                            },
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
                                [existingTicket.cantidadFracciones]: {
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
                    allIds: existingCounter ? state.ticketsCounterCollection.allIds : [...state.ticketsCounterCollection.allIds, newTicket.cantidadFracciones]
                },
                ticketsCollection: {
                    byId:
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