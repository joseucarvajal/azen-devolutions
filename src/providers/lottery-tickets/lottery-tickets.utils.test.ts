import { ITicket, IState, ITicketCounterReport } from "./lottery-tickets.contracts";
import { padLeft, getTicketFromCode, getTicketCounterReport, getSorteoFromCode } from "./lottery-tickets.utils";

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
        let ticket = getTicketFromCode(codigo, ticketCounter);
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
        ticket = getTicketFromCode(codigo, ticketCounter);
        expect(ticket).toEqual(expectedTicket);
    });

    it('should return consistent counter report', () => {

        const state = {
            sorteo: "4640",
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
            tickerCounterReport: {} as ITicketCounterReport            
        } as IState;

        const ticketReport = getTicketCounterReport(state, 'agente');

        console.log('report', JSON.stringify(ticketReport));

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

    it('should get sorteo from barcode', ()=>{
        const codigo = "901500046352594093";
        const sorteoExpected = '4635';

        const sorteoResult = getSorteoFromCode(codigo);

        expect(sorteoResult).toEqual(sorteoExpected);
    });

});





















