import { IStringIndexable, INumericIndexable } from "../../shared/contracts/shared.contracts";

/**
 * Lotery ticket data
 */
export interface ITicket {

    /**
     * Bar code WITHOUT last two digits (fraction)
     */
    codigo: string;

    /** 
     * 4 digits 
     */
    numero: string;

    /** 
     * 3 digits 
     */
    serie: string;

    /** 
     * 2 digits, fraction that was scanned
     */
    fraccion: string;

    /** 
     * Ticket reading might be: fraccion 03 but fraccion count: 1. This is fraction count.
     */
    cantidadFracciones: number;

    /**
     * Scanning order
     */
    readingOrder: number;
}


/**
 * Lotery ticket count,index by count
 */
export interface ITicketCount {

    /**
     * Fraction itself: { 001 | 002 | 003... }
     */
    codigo: number;

    /** 
     * Tickets
     */
    tickets: string[]
}


/**
 * lottery tickets state
 */
export interface IState {

    /**
     * Lottery code
     */
    codigoLoteria: string;

    /**
     * Sorteo Id
     */
    sorteo: string;

    /**
     * Lottery tickets counter
     */
    ticketsCounter: number;

    /**
     * Fractions collection
     */
    ticketsCounterCollection: INumericIndexable<ITicketCount>;

    /**
     * Lottery tickets collection
     */
    ticketsCollection: IStringIndexable<ITicket>;
}

/**
 * Context contract
 */
export interface ITicketsDevolutionContext {

    state: IState;
    dispatch: React.Dispatch<any>;

    setTicketDevolutionCounterReport: (ticketCounterReport: ITicketDevolutionCounterReport) => void;
    ticketDevolutionCounterReport: ITicketDevolutionCounterReport
}


export interface ITicketDevolutionCounterReport {
    agente: string;
    sorteo: string;
    totalTicketsIndxByFraction: number[];
    totalFractionsIndxByFraction: number[],
    fractionsTotalCount: number;
    ticketsTotalCount: number;
}