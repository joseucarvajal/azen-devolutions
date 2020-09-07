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
export interface ITicketsDevolutionState {

    /**
     * Lottery code
     */
    codigoLoteria: string;

    /**
     * true: Read by ticket chunk, all of the fractions must have counter = 1
     * false: Read entire ticket
     */
    leerXFracciones: boolean;

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
    state: ITicketsDevolutionState;
    dispatch: React.Dispatch<ActionType>;
}


export interface ITicketDevolutionReport {
    agente: string;
    sorteo: string;
    totalTicketsIndxByFraction: number[];
    totalFractionsIndxByFraction: number[],
    fractionsTotalCount: number;
    ticketsTotalCount: number;
}

export interface IDevolutionEntity {
    sorteo:string;
    agente: string;
    archivoDevol: string;
}

export type OptionMenu = 'VER_NUMERACION' | 'DIGITAR_CODIGO' | "TOGGLE_LECTURA_FRACCION" | undefined ;


export const ADD_LOTTERY_TICKET = "ADD_LOTTERY_TICKET";
export const SET_NEW_TICKET_DEVOLUTION_STATE = "SET_NEW_TICKET_DEVOLUTION_STATE";
export const UPDATE_TICKET_CANTIDAD = "UPDATE_TICKET_CANTIDAD";
export const REMOVE_TICKET = "REMOVE_TICKET";
export const RESET_COUNTER = "RESET_COUNTER";
export const SET_LEERXFRACCIONES = "SET_LEERXFRACCIONES";

export type ActionType =
    | { type: typeof ADD_LOTTERY_TICKET, codigo:string }
    | { type: typeof SET_NEW_TICKET_DEVOLUTION_STATE; newState:ITicketsDevolutionState }
    | { type: typeof UPDATE_TICKET_CANTIDAD; ticket:ITicket, newCounter:number }
    | { type: typeof REMOVE_TICKET; ticket:ITicket }
    | { type: typeof RESET_COUNTER; counter:number }
    | { type: typeof SET_LEERXFRACCIONES; value:boolean }
