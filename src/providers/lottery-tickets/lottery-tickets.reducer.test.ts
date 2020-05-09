import { IState, ITicket } from "./lottery-tickets.contracts";

import {
    addLotteryTicket,
} from "./lottery-tickets.actions";

import { reducer } from "./lottery-tickets.reducer";
import { initialState } from "./lottery-tickets.provider";

describe('Add tickets', () => {

    it('Should add new Couter and new ticket', () => {

        const initialState = _empty_initial_state;

        const expectedState = {
            ..._empty_initial_state,
            ticketsCounter: 1,
            ticketsCounterCollection: {
                byId: {
                    [_ticket_1_frac_1.cantidadFracciones]: {
                        codigo: _ticket_1_frac_1.cantidadFracciones,
                        tickets: [_ticket_1_frac_1.codigo]
                    }
                },
                allIds: [_ticket_1_frac_1.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [_ticket_1_frac_1.codigo]: _ticket_1_frac_1
                },
                allIds: [_ticket_1_frac_1.codigo],
            },
        } as IState;

        const resultState = reducer(initialState, addLotteryTicket({
            codigo: _ticket_1_frac_1_codigo
        }));

        expect(resultState).toEqual(expectedState);

        expect(resultState.ticketsCounterCollection.allIds).toContain(_ticket_1_frac_1.cantidadFracciones);
        expect(resultState.ticketsCounterCollection.byId[_ticket_1_frac_1.cantidadFracciones].tickets).toContain(_ticket_1_frac_1.codigo);

        // //Ticket added
        expect(
            resultState.ticketsCollection.byId
        ).toHaveProperty(_ticket_1_frac_1.codigo);
        expect(resultState.ticketsCollection.byId[_ticket_1_frac_1.codigo]).toEqual(_ticket_1_frac_1);
        expect(resultState.ticketsCollection.allIds).toContain(_ticket_1_frac_1.codigo);

    });

    it('ticket exist with diff fraction and should be relocated in a new counter obj', () => {

        const initialState = _initial_state_with_ticket_1_frac_1;
        const updatedTicketWithFract3 = _ticket_1_frac_3;

        const expectedState = {
            ..._initial_state_with_ticket_1_frac_1,
            ticketsCounterCollection: {
                byId: {
                    [_ticket_1_frac_1.cantidadFracciones]: {
                        codigo: _ticket_1_frac_1.cantidadFracciones,
                        tickets: []
                    },
                    [updatedTicketWithFract3.cantidadFracciones]: {
                        codigo: updatedTicketWithFract3.cantidadFracciones,
                        tickets: [updatedTicketWithFract3.codigo]
                    }
                },
                allIds: [_ticket_1_frac_1.cantidadFracciones, updatedTicketWithFract3.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [updatedTicketWithFract3.codigo]: updatedTicketWithFract3
                },
                allIds: [updatedTicketWithFract3.codigo],
            },
        } as IState;

        const resultState = reducer(initialState, addLotteryTicket({
            codigo: _ticket_1_frac_3_codigo
        }));
        
        expect(resultState).toEqual(expectedState);
    });

    it('Should not add the same ticket (same fraction) twice', () => {

        const codigo = _ticket_1_frac_1_codigo;

        const initialState = _initial_state_with_ticket_1_frac_1;

        const receivedState = reducer(initialState, addLotteryTicket({
            codigo
        }));

        expect(receivedState).toEqual(initialState);
    });    

    it('Should not add ticket with barcode length different to 20', () => {       

        const initialState = _initial_state_with_ticket_1_frac_1;

        const receivedState = reducer(initialState, addLotteryTicket({
            codigo:"31513513351"
        }));

        expect(receivedState).toEqual(initialState);
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
} as IState;

const _ticket_1_frac_1_codigo = '90150004641830216701';
const _ticket_1_frac_1_codigo_nofrac = _ticket_1_frac_1_codigo.substr(0, _ticket_1_frac_1_codigo.length - 2);
const _ticket_1_frac_1 = {
    codigo: _ticket_1_frac_1_codigo_nofrac,
    cantidadFracciones: 1,
    fraccion: '01',
    numero: '8302',
    serie: '167',
    readingOrder: 1
} as ITicket;


const _ticket_1_frac_3_codigo = '90150004641830216703';
const _ticket_1_frac_3_codigo_nofrac = _ticket_1_frac_3_codigo.substr(0, _ticket_1_frac_3_codigo.length - 2);
const _ticket_1_frac_3 = {
    ..._ticket_1_frac_1,
    codigo: _ticket_1_frac_3_codigo_nofrac,
    cantidadFracciones: 3,
    fraccion: '03',
};

const _initial_state_with_ticket_1_frac_1 = {
    ...initialState,
    ticketsCounter: 1,
    ticketsCounterCollection: {
        byId: {
            [_ticket_1_frac_1.cantidadFracciones]: {
                codigo: _ticket_1_frac_1.cantidadFracciones,
                tickets: [_ticket_1_frac_1.codigo]
            }
        },
        allIds: [_ticket_1_frac_1.cantidadFracciones],
    },
    ticketsCollection: {
        byId: {
            [_ticket_1_frac_1.codigo]: _ticket_1_frac_1
        },
        allIds: [_ticket_1_frac_1.codigo],
    },
} as IState;