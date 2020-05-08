import { IState, ITicketCount } from "./lottery-tickets.contracts";
import ActionType, * as Actions from "./lottery-tickets.types";

import { getTicketFromCode } from "./lottery-tickets.utils";
import { INumericIndexable } from "../../shared/contracts/shared.contracts";

export const reducer = (state: IState, action: ActionType): IState => {

    switch (action.type) {
        case Actions.ADD_LOTTERY_TICKET:
            
            const ticket = state.ticketsCollection.byId[action.payload];

            const ticketsCounter = state.ticketsCounter + 1;
            const newTicket = getTicketFromCode(action.payload, ticketsCounter);

            const counterObj = state.ticketsCountCollection.byId[newTicket.cantidadFracciones];

            return {
                ...state,
                ticketsCounter,
                ticketsCountCollection: {
                    byId: counterObj
                        ? {
                            ...state.ticketsCountCollection.byId,
                            [newTicket.cantidadFracciones]: {
                                ...counterObj,
                                tickets: [...counterObj.tickets, newTicket.codigo]
                            }
                        }
                        :
                        {
                            ...state.ticketsCountCollection.byId,
                            [newTicket.cantidadFracciones]: {
                                count: newTicket.cantidadFracciones,
                                tickets: [newTicket.codigo]
                            }
                        },
                    allIds: counterObj ? state.ticketsCountCollection.allIds : [...state.ticketsCountCollection.allIds, newTicket.cantidadFracciones]
                },
                ticketsCollection: {
                    byId: { ...state.ticketsCollection.byId, [newTicket.codigo]: newTicket },
                    allIds: [...state.ticketsCollection.allIds, newTicket.codigo]
                }
            };

        default:
            return state;
    }
}