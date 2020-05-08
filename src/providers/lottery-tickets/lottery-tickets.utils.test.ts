import { ITicket } from "./lottery-tickets.contracts";
import { padLeft, getTicketFromCode } from "./lottery-tickets.utils";

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

});