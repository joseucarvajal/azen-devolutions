import { INormalizedEntity } from "../../shared/contracts/shared.contracts";

/**
 * Lotery ticket data
 */
export interface ITicket {

    /**
     * Memory autogenerated property
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
     * 3 digits 
     */
    fraccion: string;

    /** 
     * 2 digits 
     */
    cantidad: number;

    /**
     * ID: 4 digits padding counter 
     */
    contador: string;
}


/**
 * Lotery ticket data
 */
export interface IFraction {

    /**
     * Fraction itself: { 1 | 2 | 3... }
     */
    id: number;

    /** 
     * count
     */
    tickets: number[]
}


/**
 * lottery tickets state
 */
export default interface IState {
    fractions: INormalizedEntity<IFraction>;
    tickets: INormalizedEntity<ITicket>;
}