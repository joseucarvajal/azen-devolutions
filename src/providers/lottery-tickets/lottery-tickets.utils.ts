import { ITicket, IState, ITicketCount, ITicketCounterReport } from "./lottery-tickets.contracts";

/**
 * 
 * @param codigo ticket code, should be wellformed. This method doesnt perform codigo validations
 * @param readingOrder major counter
 */
export const getTicketFromCode = (codigo: string, readingOrder: number): ITicket => {

    const fraccion = codigo.substr(18, 2);

    return {
        codigo: codigo.substr(0, codigo.length - 2),
        numero: codigo.substr(11, 4),
        serie: codigo.substr(15, 3),
        fraccion: fraccion,
        cantidadFracciones: +fraccion,
        readingOrder
    } as ITicket;
};


/**
 * Pads left a given value
 * @param str string to padd
 * @param max cant places to pad
 */
export const padLeft = (str: string, max: number): string => {
    str = str.toString();
    return str.length < max ? padLeft("0" + str, max) : str;
}


export const getTicketCounterReport = (state:IState, agente:string) => {

    const ticketCounterReport = {
        agente,
        sorteo: '',
        fractionsTotalCount: 0,
        totalTicketsIndxByFraction: [],
        totalFractionsIndxByFraction: [],
    } as ITicketCounterReport;
        
    ticketCounterReport.sorteo = state.sorteo;
    
    for(let [counterCode, counterObj]  of Object.entries(state.ticketsCounterCollection.byId)){
        const { codigo, tickets } = (counterObj as ITicketCount);
        ticketCounterReport.totalTicketsIndxByFraction.push(tickets.length);
        ticketCounterReport.totalFractionsIndxByFraction.push(codigo * tickets.length);
        ticketCounterReport.fractionsTotalCount += codigo * tickets.length;
    }

    return ticketCounterReport;
    
}

export const getSorteoFromCode = (codigo: string): string => {    
    return codigo.substr(7, 4);
}
