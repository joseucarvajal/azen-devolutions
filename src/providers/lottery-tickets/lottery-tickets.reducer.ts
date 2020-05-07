import { IState } from "./lottery-tickets.contracts";
import ActionType, * as Actions from "./lottery-tickets.types";

export const reducer = (state: IState, action: ActionType): IState => {

    switch (action.type) {
        case Actions.ADD_LOTTERY_TICKET:

            const newTicket = action.payload;
            const ticket = state.tickets.byId[newTicket.codigo];

            if (ticket) {
                return state;
            }

            const fraction = state.fractions.byId[newTicket.fraccion];

            return {
                fractions: {
                    byId: fraction
                        ? {
                            ...state.fractions.byId,
                            [newTicket.fraccion]: {
                                ...fraction,
                                tickets: [...fraction.tickets, newTicket.codigo]
                            }
                        }
                        :
                        {
                            ...state.fractions.byId,
                            [newTicket.fraccion]: {
                                codigo: newTicket.fraccion,
                                tickets: [newTicket.codigo]
                            }
                        },
                    allIds: fraction ? state.fractions.allIds : [...state.fractions.allIds, newTicket.fraccion]
                },
                tickets: {
                    byId: { ...state.tickets.byId, [newTicket.codigo]: newTicket },
                    allIds: [...state.tickets.allIds, newTicket.codigo]
                }
            } as IState;

        default:
            return state;
    }
}