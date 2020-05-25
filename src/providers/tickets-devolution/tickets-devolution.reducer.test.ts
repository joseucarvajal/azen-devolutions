import { ITicketsDevolutionState, ITicket, ADD_LOTTERY_TICKET } from "./tickets-devolution.types";

import { reducer } from "./tickets-devolution.reducer";
import { initialState } from "./tickets-devolution.context";

describe('Add tickets', () => {

    it('Should add new Couter and new ticket', () => {

        const initialState = _empty_initial_state;

        const expectedState = {
            ..._empty_initial_state,
            codigoLoteria: '15',
            sorteo: '4640',
            ticketsCounter: 1,
            ticketsCounterCollection: {
                byId: {
                    [_ticket_1_1.cantidadFracciones]: {
                        codigo: _ticket_1_1.cantidadFracciones,
                        tickets: [_ticket_1_1.codigo]
                    }
                },
                allIds: [_ticket_1_1.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [_ticket_1_1.codigo]: _ticket_1_1
                },
                allIds: [_ticket_1_1.codigo],
            },
        } as ITicketsDevolutionState;

        const resultState = reducer(
            initialState,
            { type: ADD_LOTTERY_TICKET, codigo: _ticket_1_1_codigo });

        expect(resultState).toEqual(expectedState);

        expect(resultState.ticketsCounterCollection.allIds).toContain(_ticket_1_1.cantidadFracciones);
        expect(resultState.ticketsCounterCollection.byId[_ticket_1_1.cantidadFracciones].tickets).toContain(_ticket_1_1.codigo);

        // //Ticket added
        expect(
            resultState.ticketsCollection.byId
        ).toHaveProperty(_ticket_1_1.codigo);
        expect(resultState.ticketsCollection.byId[_ticket_1_1.codigo]).toEqual(_ticket_1_1);
        expect(resultState.ticketsCollection.allIds).toContain(_ticket_1_1.codigo);

    });

    //Reads ticket 1_1, then 1_3
    it('ticket exist with diff greater fraction should be relocated in a new counter obj', () => {

        const initialState = _state_with_ticket_1_1;
        const updatedTicketWithFract3 = _ticket_1_3;

        const expectedState = {
            ..._state_with_ticket_1_1,
            sorteo: '4640',
            ticketsCounterCollection: {
                byId: {
                    [_ticket_1_1.cantidadFracciones]: {
                        codigo: _ticket_1_1.cantidadFracciones,
                        tickets: []
                    },
                    [updatedTicketWithFract3.cantidadFracciones]: {
                        codigo: updatedTicketWithFract3.cantidadFracciones,
                        tickets: [updatedTicketWithFract3.codigo]
                    }
                },
                allIds: [_ticket_1_1.cantidadFracciones, updatedTicketWithFract3.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [updatedTicketWithFract3.codigo]: updatedTicketWithFract3
                },
                allIds: [updatedTicketWithFract3.codigo],
            },
        } as ITicketsDevolutionState;

        const resultState = reducer(
            initialState,
            { type: ADD_LOTTERY_TICKET, codigo: _ticket_1_3_codigo });

        expect(resultState).toEqual(expectedState);
    });

    //Previous state: 1_3 y ticket 2_1, then reads 2_3
    it('ticket exist with diff greater fraction should be replaced with new one in an existing counter obj', () => {

        const initialState = _state_with_tickets_1_3_and_2_1;

        const expectedState = {
            ..._state_with_tickets_1_3_and_2_1,
            sorteo: '4640',
            ticketsCounterCollection: {
                byId: {
                    [_ticket_2_1.cantidadFracciones]: {
                        codigo: _ticket_2_1.cantidadFracciones,
                        tickets: []
                    },
                    [_ticket_2_3.cantidadFracciones]: {
                        codigo: _ticket_2_3.cantidadFracciones,
                        tickets: [_ticket_1_3.codigo, _ticket_2_3.codigo]
                    }
                },
                allIds: [_ticket_1_3.cantidadFracciones, _ticket_2_1.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [_ticket_1_3.codigo]: _ticket_1_3,
                    [_ticket_2_3.codigo]: _ticket_2_3
                },
                allIds: [_ticket_1_3.codigo, _ticket_2_3.codigo],
            },
        } as ITicketsDevolutionState;

        const resultState = reducer(
            initialState,
            { type: ADD_LOTTERY_TICKET, codigo: _ticket_2_3_codigo });

        expect(resultState).toEqual(expectedState);
    });

    it('Should not add the same ticket (same fraction) twice', () => {

        const codigo = _ticket_1_1_codigo;

        const initialState = _state_with_ticket_1_1;

        const receivedState = reducer(
            initialState,
            { type: ADD_LOTTERY_TICKET, codigo });

        expect(receivedState).toEqual(initialState);
    });

    it('Should not add ticket with barcode length different to 20', () => {

        const initialState = _state_with_ticket_1_1;

        const receivedState = reducer(
            initialState,
            { type: ADD_LOTTERY_TICKET, codigo: "31513513351" });

        expect(receivedState).toBe(initialState);
    });

    it('Should NOT replace ticket with other one that has lesser fraction', () => {

        const initialState = _state_with_ticket_1_3;

        const resultState = reducer(
            initialState,
            { type: ADD_LOTTERY_TICKET, codigo: _ticket_1_1_codigo });

        expect(resultState.ticketsCollection.byId[_ticket_1_1_codigo_nofrac])
            .toMatchObject({
                codigo: _ticket_1_3_codigo_nofrac,
                fraccion: _ticket_1_3.fraccion,
                cantidadFracciones: _ticket_1_3.cantidadFracciones
            } as ITicket);

    });
});

const _empty_initial_state = {
    codigoLoteria: '',
    sorteo: '',
    ticketsCounter: 0,
    ticketsCounterCollection: {
        byId: {},
        allIds: [],
    },
    ticketsCollection: {
        byId: {},
        allIds: [],
    },
} as ITicketsDevolutionState;

const _ticket_1_1_codigo = '90150004640715400101';
const _ticket_1_1_codigo_nofrac = _ticket_1_1_codigo.substr(0, _ticket_1_1_codigo.length - 2);
const _ticket_1_1 = {
    codigo: _ticket_1_1_codigo_nofrac,
    cantidadFracciones: 1,
    fraccion: '01',
    numero: '7154',
    serie: '001',
    readingOrder: 1
} as ITicket;


const _ticket_1_3_codigo = '90150004640715400103';
const _ticket_1_3_codigo_nofrac = _ticket_1_3_codigo.substr(0, _ticket_1_3_codigo.length - 2);
const _ticket_1_3 = {
    ..._ticket_1_1,
    codigo: _ticket_1_3_codigo_nofrac,
    cantidadFracciones: 3,
    fraccion: '03',
} as ITicket;

const _state_with_ticket_1_1 = {
    ...initialState,
    sorteo: '4640',
    codigoLoteria: '15',
    ticketsCounter: 1,
    ticketsCounterCollection: {
        byId: {
            [_ticket_1_1.cantidadFracciones]: {
                codigo: _ticket_1_1.cantidadFracciones,
                tickets: [_ticket_1_1.codigo]
            }
        },
        allIds: [_ticket_1_1.cantidadFracciones],
    },
    ticketsCollection: {
        byId: {
            [_ticket_1_1.codigo]: _ticket_1_1
        },
        allIds: [_ticket_1_1.codigo],
    },
} as ITicketsDevolutionState;

const _state_with_ticket_1_3 = {
    ...initialState,
    codigoLoteria: '15',
    sorteo: '4640',
    ticketsCounter: 1,
    ticketsCounterCollection: {
        byId: {
            [_ticket_1_3.cantidadFracciones]: {
                codigo: _ticket_1_3.cantidadFracciones,
                tickets: [_ticket_1_3.codigo]
            }
        },
        allIds: [_ticket_1_3.cantidadFracciones],
    },
    ticketsCollection: {
        byId: {
            [_ticket_1_3.codigo]: _ticket_1_3
        },
        allIds: [_ticket_1_3.codigo],
    },
} as ITicketsDevolutionState;


const _ticket_2_1_codigo = '90150004640475119901';
const _ticket_2_1_codigo_nofrac = _ticket_2_1_codigo.substr(0, _ticket_2_1_codigo.length - 2);
const _ticket_2_1 = {
    codigo: _ticket_2_1_codigo_nofrac,
    cantidadFracciones: 1,
    fraccion: '01',
    numero: '4751',
    serie: '199',
    readingOrder: 2
} as ITicket;

const _ticket_2_3_codigo = '90150004640475119903';
const _ticket_2_3_codigo_nofrac = _ticket_2_3_codigo.substr(0, _ticket_2_3_codigo.length - 2);
const _ticket_2_3 = {
    ..._ticket_2_1,
    codigo: _ticket_2_3_codigo_nofrac,
    cantidadFracciones: 3,
    fraccion: '03',
} as ITicket;

//ticket exist with diff fraction should be relocated in an existing counter obj
const _state_with_tickets_1_3_and_2_1 = {
    ...initialState,
    sorteo: '4640',
    codigoLoteria: '15',
    ticketsCounter: 2,
    ticketsCounterCollection: {
        byId: {
            [_ticket_1_3.cantidadFracciones]: {
                codigo: _ticket_1_3.cantidadFracciones,
                tickets: [_ticket_1_3.codigo]
            },
            [_ticket_2_1.cantidadFracciones]: {
                codigo: _ticket_2_1.cantidadFracciones,
                tickets: [_ticket_2_1.codigo]
            }
        },
        allIds: [_ticket_1_3.cantidadFracciones, _ticket_2_1.cantidadFracciones],
    },
    ticketsCollection: {
        byId: {
            [_ticket_1_3.codigo]: _ticket_1_3,
            [_ticket_2_1.codigo]: _ticket_2_1
        },
        allIds: [_ticket_1_3.codigo, _ticket_2_1.codigo],
    },
} as ITicketsDevolutionState;