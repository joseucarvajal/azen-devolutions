import { IState, ITicket } from "./lottery-tickets.contracts";

import {
    addLotteryTicket,
} from "./lottery-tickets.actions";

import { reducer } from "./lottery-tickets.reducer";

describe('Add tickets', () => {

    it('Should add new Fraction and new ticket', () => {

        const initialState = {
            fractions: {
                byId: {},
                allIds: [],
            },
            tickets: {
                byId: {},
                allIds: [],
            },
        } as IState;

        const newTicket = { codigo: "90150004641830216701", fraccion: "001", numero: "4409" } as ITicket;

        const expectedState = {
            fractions: {
                byId: {
                    [newTicket.fraccion]: {
                        codigo: newTicket.fraccion,
                        tickets: [newTicket.codigo]
                    }
                },
                allIds: [newTicket.fraccion],
            },
            tickets: {
                byId: {
                    [newTicket.codigo]: newTicket
                },
                allIds: [newTicket.codigo],
            },
        } as IState;

        const resultState = reducer(initialState, addLotteryTicket(newTicket));
        expect(resultState).toEqual(expectedState);

        //Fraction added
        expect(
            resultState.fractions.byId
        ).toHaveProperty(newTicket.fraccion);

        expect(resultState.fractions.allIds).toContain(newTicket.fraccion);
        expect(resultState.fractions.byId[newTicket.fraccion].tickets).toContain(newTicket.codigo);

        //Ticket added
        expect(
            resultState.tickets.byId
        ).toHaveProperty(newTicket.codigo);
        expect(resultState.tickets.allIds).toContain(newTicket.codigo);

    });

    it('Should NOT add new repeated ticket', () => {

        const existingTicket = { codigo: "90150004641830216701", fraccion: "001", numero: "4409" } as ITicket;

        const initialState = {
            fractions: {
                byId: {
                    [existingTicket.fraccion]: {
                        codigo: existingTicket.fraccion,
                        tickets: [existingTicket.codigo]
                    }
                },
                allIds: [existingTicket.fraccion],
            },
            tickets: {
                byId: {
                    [existingTicket.codigo]: existingTicket
                },
                allIds: [existingTicket.codigo],
            },
        } as IState;

        const newTicket = { ...existingTicket } as ITicket;

        const resultState = reducer(initialState, addLotteryTicket(newTicket));
        
        expect(resultState).toEqual(initialState);
    });


    it('Should add new ticket but NOT new fraction', () => {

        const sameFraction = "001";

        const existingTicket = { 
            codigo: "90150004641830216701", 
            fraccion: sameFraction, 
            numero: "8302", 
            serie: "167" } as ITicket;

        const initialState = {
            fractions: {
                byId: {
                    [existingTicket.fraccion]: {
                        codigo: existingTicket.fraccion,
                        tickets: [existingTicket.codigo]
                    }
                },
                allIds: [existingTicket.fraccion],
            },
            tickets: {
                byId: {
                    [existingTicket.codigo]: existingTicket
                },
                allIds: [existingTicket.codigo],
            },
        } as IState;

        const newTicket = { 
            codigo: "90150004635259409303", 
            fraccion: sameFraction, 
            numero: "2594", 
            serie: "093" } as ITicket;

        const resultState = reducer(initialState, addLotteryTicket(newTicket));

        expect(resultState.tickets.byId).toHaveProperty(newTicket.codigo);
        expect(resultState.tickets.allIds).toContain(newTicket.codigo);        
        expect(resultState.fractions.byId[sameFraction].tickets).toContain(newTicket.codigo);
        expect(resultState.fractions.allIds.length).toEqual(1);
    });
});