import { IState, ITicket } from "./lottery-tickets.contracts";

import {
    addLotteryTicket,
} from "./lottery-tickets.actions";

import { reducer } from "./lottery-tickets.reducer";

describe('Add tickets', () => {

    it('Should add new Couter and new ticket', () => {

        const initialState = {
            codigoLoteria: '',
            sorteo: '',
            ticketsCounter: 0,
            ticketsCountCollection: {
                byId: {},
                allIds: [],
            },
            ticketsCollection: {
                byId: {},
                allIds: [],
            },
        } as IState;

        const codigo = "90150004641830216701";
        const codigoWithoutFraccion = "901500046418302167";

        let expectedTicket = {
            codigo: codigoWithoutFraccion,
            cantidadFracciones: 1,
            fraccion: '01',
            numero: '8302',
            serie: '167',
            readingOrder: 1
        } as ITicket;

        const expectedState = {
            codigoLoteria: '',
            sorteo: '',
            ticketsCounter: 1,
            ticketsCountCollection: {
                byId: {
                    [expectedTicket.cantidadFracciones]: {
                        codigo: expectedTicket.cantidadFracciones,
                        tickets: [expectedTicket.codigo]
                    }
                },
                allIds: [expectedTicket.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [expectedTicket.codigo]: expectedTicket
                },
                allIds: [expectedTicket.codigo],
            },
        } as IState;

        const receivedState = reducer(initialState, addLotteryTicket({
            codigo
        }));

        expect(receivedState).toEqual(expectedState);

        expect(receivedState.ticketsCountCollection.allIds).toContain(expectedTicket.cantidadFracciones);
        expect(receivedState.ticketsCountCollection.byId[expectedTicket.cantidadFracciones].tickets).toContain(expectedTicket.codigo);

        // //Ticket added
        expect(
            receivedState.ticketsCollection.byId
        ).toHaveProperty(expectedTicket.codigo);
        expect(receivedState.ticketsCollection.byId[expectedTicket.codigo]).toEqual(expectedTicket);
        expect(receivedState.ticketsCollection.allIds).toContain(expectedTicket.codigo);

    });

    it('Should remove old ticket repeated (different fraction) and add the new one', () => {

        const codigo = "90150004641830216701";
        const codigoRealTicket = codigo.substr(0, codigo.length - 2);

        const existingTicket = {
            codigo: codigoRealTicket,
            cantidadFracciones: 1,
            fraccion: '01',
            numero: '8302',
            serie: '167',
            readingOrder: 1
        } as ITicket;

        const initialState = {
            codigoLoteria: '',
            sorteo: '',
            ticketsCounter: 1,
            ticketsCountCollection: {
                byId: {
                    [existingTicket.cantidadFracciones]: {
                        codigo: existingTicket.cantidadFracciones,
                        tickets: [existingTicket.codigo]
                    }
                },
                allIds: [existingTicket.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [existingTicket.codigo]: existingTicket
                },
                allIds: [existingTicket.codigo],
            },
        } as IState;

        const newTicket = {
            ...existingTicket,
            codigo: "90150004641830216703",
            fraccion: "03",
            cantidadFracciones: 3,
        };

        const expectedState = {
            codigoLoteria: '',
            sorteo: '',
            ticketsCounter: 1,
            ticketsCountCollection: {
                byId: {
                    [existingTicket.cantidadFracciones]: {
                        codigo: existingTicket.cantidadFracciones,
                        tickets: []
                    },
                    [newTicket.cantidadFracciones]: {
                        codigo: newTicket.cantidadFracciones,
                        tickets: [codigoRealTicket]
                    }
                },
                allIds: [existingTicket.cantidadFracciones, newTicket.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [codigoRealTicket]: { ...newTicket, codigo: codigoRealTicket }
                },
                allIds: [codigoRealTicket],
            },
        } as IState;

        const receivedState = reducer(initialState, addLotteryTicket({
            codigo: newTicket.codigo
        }));

        expect(receivedState).toEqual(expectedState);
    });

    it('Should not add the same ticket (same fraction) twice', () => {

        const codigo = "90150004641830216701";
        const codigoRealTicket = codigo.substr(0, codigo.length - 2);

        const existingTicket = {
            codigo: codigoRealTicket,
            cantidadFracciones: 1,
            fraccion: '01',
            numero: '8302',
            serie: '167',
            readingOrder: 1
        } as ITicket;

        const initialState = {
            codigoLoteria: '',
            sorteo: '',
            ticketsCounter: 1,
            ticketsCountCollection: {
                byId: {
                    [existingTicket.cantidadFracciones]: {
                        codigo: existingTicket.cantidadFracciones,
                        tickets: [existingTicket.codigo]
                    }
                },
                allIds: [existingTicket.cantidadFracciones],
            },
            ticketsCollection: {
                byId: {
                    [existingTicket.codigo]: existingTicket
                },
                allIds: [existingTicket.codigo],
            },
        } as IState;

        const receivedState = reducer(initialState, addLotteryTicket({
            codigo
        }));

        expect(receivedState).toEqual(initialState);
    });

});