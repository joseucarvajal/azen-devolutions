import { IState, ITicket } from "./lottery-tickets.contracts";

import {
    addLotteryTicket,
} from "./lottery-tickets.actions";

import { reducer } from "./lottery-tickets.reducer";

describe('Add tickets', () => {

    it('Should add new Fraction and new ticket', () => {

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
                        count: expectedTicket.cantidadFracciones,
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

        const receivedState = reducer(initialState, addLotteryTicket(codigo));

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

    // it('Should increment quantity with a repeated ticket', () => {

    //     const codigo = "90150004641830216701";

    //     let initialTicket = {
    //         codigo,
    //         cantidadFracciones:1,
    //         fraccion: '01',
    //         numero: '8302',
    //         serie: '167'
    //     } as ITicket;

    //     const initialState = {
    //         codigoLoteria: '',
    //         sorteo: '',
    //         ticketsCounter: 1,
    //         ticketsCountCollection: {
    //             byId: {
    //                 [initialTicket.fraccion]: {
    //                     count: initialTicket.fraccion,
    //                     tickets: [initialTicket.codigo]
    //                 }
    //             },
    //             allIds: [initialTicket.fraccion],
    //         },
    //         ticketsCollection: {
    //             byId: {
    //                 [initialTicket.codigo]: initialTicket
    //             },
    //             allIds: [initialTicket.codigo],
    //         },
    //     } as IState;


    //     let expectecTicket = { ...initialTicket, cantidad:2 };

    //     const expectedState = {
    //         codigoLoteria: '',
    //         sorteo: '',
    //         ticketsCounter: 2,
    //         ticketsCountCollection: {
    //             byId: {
    //                 [expectecTicket.fraccion]: {
    //                     count: expectecTicket.fraccion,
    //                     tickets: [expectecTicket.codigo]
    //                 }
    //             },
    //             allIds: [expectecTicket.fraccion],
    //         },
    //         ticketsCollection: {
    //             byId: {
    //                 [expectecTicket.codigo]: expectecTicket
    //             },
    //             allIds: [expectecTicket.codigo],
    //         },
    //     } as IState;

    //     const resultState = reducer(initialState, addLotteryTicket(codigo));

    //     expect(resultState).toEqual(expectedState);
    // });

});