import { ITicket, ITicketsDevolutionState, ITicketDevolutionReport } from "../tickets-devolution.types";
import { padLeft, getTicketFromCode, getTicketCounterReport, getSorteoFromCode, getLoteriaFromCode, getFileReportStr } from "../tickets-devolution.utils";

import { initialState } from "../tickets-devolution.context";

describe('Utils tests', () => {

    it('Should pad left 5 spaces', () => {
        let expected = "00001";
        let padded = padLeft("1", 5);
        expect(padded).toEqual(expected);

        expected = "00012";
        padded = padLeft("12", 5);
        expect(padded).toEqual(expected);

        expected = "00312";
        padded = padLeft("312", 5);
        expect(padded).toEqual(expected);

    });

    it('should get wellformed ticket', () => {

        let codigo = "90150004641830216701";
        let ticketCounter = 1;
        let expectedTicket = {
            codigo: "901500046418302167",
            cantidadFracciones: 1,
            fraccion: '01',
            numero: '8302',
            serie: '167',
            readingOrder: 1
        } as ITicket;
        let ticket = getTicketFromCode(codigo, ticketCounter, false);
        expect(ticket).toEqual(expectedTicket);

        codigo = "90150004635259409303";
        ticketCounter = 4;
        expectedTicket = {
            codigo: "901500046352594093",
            cantidadFracciones: 3,
            fraccion: '03',
            numero: '2594',
            serie: '093',
            readingOrder: 4
        } as ITicket;
        ticket = getTicketFromCode(codigo, ticketCounter, false);
        expect(ticket).toEqual(expectedTicket);
    });

    it('should return consistent counter report', () => {

        const state = {
            sorteo: "4640",
            leerXFracciones: false,
            codigoLoteria: '',
            ticketsCounter: 6,
            ticketsCounterCollection: {
                byId: {
                    1: {
                        codigo: 1,
                        tickets: ["2", "3"]
                    },
                    2: {
                        codigo: 2,
                        tickets: ["5", "7"]
                    },
                    3: {
                        codigo: 3,
                        tickets: ["4", "1", "6"]
                    }
                },
                allIds: [1]
            },
            ticketsCollection: {
                byId: {
                    "1": {} as ITicket,
                    "2": {} as ITicket,
                    "3": {} as ITicket,
                    "4": {} as ITicket,
                    "5": {} as ITicket,
                    "6": {} as ITicket,
                },
                allIds: ["1", "2", "3", "4", "5", '6']
            },
            tickerCounterReport: {} as ITicketDevolutionReport            
        } as ITicketsDevolutionState;

        const ticketReport = getTicketCounterReport(state, 'agente');        

        expect(ticketReport.agente).toEqual('agente');

        expect(ticketReport.fractionsTotalCount).toEqual(15);

        expect(ticketReport.totalTicketsIndxByFraction).toContain(2); //Tickets of 1 fraction
        expect(ticketReport.totalTicketsIndxByFraction).toContain(2); //Tickets of 2 fraction
        expect(ticketReport.totalTicketsIndxByFraction).toContain(3); //Tickets of 3 fraction
        
        expect(ticketReport.totalFractionsIndxByFraction).toContain(2); //Fractions of 1 fraction
        expect(ticketReport.totalFractionsIndxByFraction).toContain(4); //Fractions of 2 fraction
        expect(ticketReport.totalFractionsIndxByFraction).toContain(9); //Fractions of 3 fraction

        expect(ticketReport.sorteo).toEqual('4640');

    });

    it('should get loteria from barcode', ()=>{
        const codigo = "901500046352594093";
        const loteriaExpected = '15';

        const loteriaResult = getLoteriaFromCode(codigo);

        expect(loteriaResult).toEqual(loteriaExpected);
    });

    it('should get sorteo from barcode', ()=>{
        const codigo = "901500046352594093";
        const sorteoExpected = '4635';

        const sorteoResult = getSorteoFromCode(codigo);

        expect(sorteoResult).toEqual(sorteoExpected);
    });

    it('Should generate file report in a consistent way', () => {
        
        const state = _state_with_tickets_1_3_and_2_1_and_3_3;
        const agent = 'azen';

        const reportStr = getFileReportStr(state, agent);

        const reportStrParts = reportStr.split('\n');

        expect(reportStrParts[0]).toEqual(state.codigoLoteria);
        expect(reportStrParts[1]).toEqual(agent);
        expect(reportStrParts[2]).toEqual(state.sorteo);
        expect(reportStrParts[3]).toEqual('7');

        expect(reportStrParts[5].substr(0, 4)).toEqual(_ticket_2_1.numero);
        expect(reportStrParts[5].substr(4, 3)).toEqual(_ticket_2_1.serie);
        expect(reportStrParts[5].substr(7, 3)).toEqual(`0${_ticket_2_1.fraccion}`);
        expect(reportStrParts[5].substr(10, 2)).toEqual(`0${_ticket_2_1.cantidadFracciones}`);
        expect(reportStrParts[5].substr(12, 5)).toEqual(`00002`);
    });
});

const _ticket_1_3_codigo = '90150004640715400103';
const _ticket_1_3_codigo_nofrac = _ticket_1_3_codigo.substr(0, _ticket_1_3_codigo.length - 2);
const _ticket_1_3 = {
    numero: '7154',
    serie: '001',
    readingOrder: 1,
    codigo: _ticket_1_3_codigo_nofrac,
    cantidadFracciones: 3,
    fraccion: '03',
} as ITicket;


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


const _ticket_3_3_codigo = '90150004640481000003';
const _ticket_3_3_codigo_nofrac = _ticket_3_3_codigo.substr(0, _ticket_3_3_codigo.length - 2);
const _ticket_3_3 = {
    codigo: _ticket_3_3_codigo_nofrac,
    cantidadFracciones: 3,
    fraccion: '03',
    numero: '4810',
    serie: '000',
    readingOrder: 3
} as ITicket;

const _state_with_tickets_1_3_and_2_1_and_3_3 = {
    ...initialState,
    codigoLoteria: '15',
    sorteo: '4640',
    ticketsCounter: 3,
    ticketsCounterCollection: {
        byId: {
            [_ticket_1_3.cantidadFracciones]: {
                codigo: _ticket_1_3.cantidadFracciones,
                tickets: [_ticket_1_3.codigo, _ticket_3_3.codigo]
            },
            [_ticket_2_1.cantidadFracciones]: {
                codigo: _ticket_2_1.cantidadFracciones,
                tickets: [_ticket_2_1.codigo]
            }    
        },
        allIds: [_ticket_1_3.cantidadFracciones, _ticket_2_1.cantidadFracciones, _ticket_3_3.cantidadFracciones],
    },
    ticketsCollection: {
        byId: {
            [_ticket_1_3.codigo]: _ticket_1_3,
            [_ticket_2_1.codigo]: _ticket_2_1,
            [_ticket_3_3.codigo]: _ticket_3_3
        },
        allIds: [_ticket_1_3.codigo, _ticket_2_1.codigo, _ticket_3_3.codigo],
    },
} as ITicketsDevolutionState;





















