import {
    ITicket,
    ITicketsDevolutionState,
    ITicketCount,
    ITicketDevolutionReport
} from "./tickets-devolution.types";

/**
 * 
 * @param codigo ticket code, should be wellformed. This method doesnt perform codigo validations
 * @param readingOrder major counter
 */
export const getTicketFromCode = (codigo: string, readingOrder: number, leerXFracciones: boolean): ITicket => {

    const fraccion = codigo.substr(18, 2);

    return {
        codigo: codigo.substr(0, codigo.length - 2),
        numero: codigo.substr(11, 4),
        serie: codigo.substr(15, 3),
        fraccion: fraccion,
        cantidadFracciones: leerXFracciones ? 1 : +fraccion,
        readingOrder
    } as ITicket;
};

/**
 * Pads left a given value
 * @param str string to padd
 * @param max cant places to pad
 */
export const padLeft = (str: any, max: number): string => {
    str = str.toString();
    return str.length < max ? padLeft("0" + str, max) : str;
}


export const getTicketCounterReport = (state: ITicketsDevolutionState, agente: string) => {

    const ticketCounterReport = {
        agente,
        sorteo: '',
        fractionsTotalCount: 0,
        totalTicketsIndxByFraction: [],
        totalFractionsIndxByFraction: [],
        ticketsTotalCount: 0
    } as ITicketDevolutionReport;

    ticketCounterReport.sorteo = state.sorteo;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [counterCode, counterObj] of Object.entries(state.ticketsCounterCollection.byId)) {
        const { codigo, tickets } = (counterObj as ITicketCount);
        ticketCounterReport.totalTicketsIndxByFraction.push(tickets.length);
        ticketCounterReport.totalFractionsIndxByFraction.push(codigo * tickets.length);

        ticketCounterReport.fractionsTotalCount += codigo * tickets.length;
        ticketCounterReport.ticketsTotalCount += tickets.length;
    }

    return ticketCounterReport;

}

export const getSorteoFromCode = (codigo: string): string => {
    return codigo.substr(7, 4);
}

export const getLoteriaFromCode = (codigo: string): string => {
    return codigo.substr(2, 2);
}

export const getFileReportStr = (state: ITicketsDevolutionState, agente: string): string => {
    const strFile =
        `${state.codigoLoteria}
${agente}
${state.sorteo}
${getFileReportTicketsAndFractionCount(state)}`;

    return strFile;
}

export const getDevolutionFileName = (state: ITicketsDevolutionState, agente: string): string => {

    const dateNow = new Date();
    const { codigoLoteria, sorteo } = state;
    const hour = padLeft(dateNow.getHours(), 2);
    const minute = padLeft(dateNow.getMinutes(), 2);
    const second = padLeft(dateNow.getSeconds(), 2);

    const fileName = `da_${codigoLoteria}_${sorteo}_${agente}_${hour}${minute}${second}.txt`;

    return fileName;
}


const getFileReportTicketsAndFractionCount = (state: ITicketsDevolutionState): string => {

    let ticketsArray: ITicket[] = [];
    let fractionsTotalCount = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [counterCode, counterObj] of Object.entries(state.ticketsCounterCollection.byId)) {
        const { codigo, tickets } = (counterObj as ITicketCount);
        for (let i = 0; i < tickets.length; i++) {
            ticketsArray.push(state.ticketsCollection.byId[counterObj.tickets[i]]);
        }
        fractionsTotalCount += codigo * tickets.length;
    }

    ticketsArray = sortTicketArrayByReadingOrder(ticketsArray);

    let fractionsStr = '';
    let i = 1;
    for (let ticket of ticketsArray) {
        const { numero, serie, fraccion, cantidadFracciones } = ticket;
        fractionsStr += `${numero}${serie}0${fraccion}0${cantidadFracciones}${padLeft(i, 5)}\n`;
        i++;
    }

    const fractionsContPlusTickets =
        `${fractionsTotalCount}
${fractionsStr}`.trim();

    return fractionsContPlusTickets;
}

export const getTicketsOrderByReading = (state: ITicketsDevolutionState,
    searchNumber?: string,
    searchCounter?: number): ITicket[] => {

    let ticketsArray: ITicket[] = [];

    if (searchNumber === undefined && !searchCounter) {
        return sortTicketArrayByReadingOrder(getTicketsArray(state));
    }

    let ticket: ITicket;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [counterCode, counterObj] of Object.entries(state.ticketsCounterCollection.byId)) {
        const { tickets } = (counterObj as ITicketCount);
        for (let i = 0; i < tickets.length; i++) {
            ticket = state.ticketsCollection.byId[counterObj.tickets[i]];
            if (searchNumber && searchCounter) {
                if (ticket.numero === searchNumber && ticket.cantidadFracciones === searchCounter) {
                    ticketsArray.push(ticket);
                }
            }
            else if (searchNumber && !searchCounter) {
                if (ticket.numero === searchNumber) {
                    ticketsArray.push(ticket);
                }
            }
            else if (searchCounter && !searchNumber) {
                if (ticket.cantidadFracciones === searchCounter) {
                    ticketsArray.push(ticket);
                }
            }
        }
    }

    ticketsArray = sortTicketArrayByReadingOrder(ticketsArray)

    return ticketsArray;
}

const sortTicketArrayByReadingOrder = (ticketsArray: ITicket[]) => {
    return ticketsArray.sort((a: ITicket, b: ITicket) => {
        if (a.readingOrder > b.readingOrder) {
            return 1;
        }
        return -1;
    });
}

const getTicketsArray = (state: ITicketsDevolutionState): ITicket[] => {

    let ticketsArray: ITicket[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [counterCode, counterObj] of Object.entries(state.ticketsCounterCollection.byId)) {
        const { tickets } = (counterObj as ITicketCount);
        for (let i = 0; i < tickets.length; i++) {
            ticketsArray.push(state.ticketsCollection.byId[counterObj.tickets[i]]);
        }
    }

    return ticketsArray;
}
