import { useContext, useEffect, useState } from "react";
import { IState } from "./lottery-tickets.contracts";
import { addLotteryTicket } from "./lottery-tickets.actions";
import { LotteryTicketsContext } from "./lottery-tickets.provider";

export interface IUseLotteryTickets {
    state: IState,
    addTicket: (codigo: string) => void,
    fraccionesCount: number[]
}

export const useLotteryTickets = (): IUseLotteryTickets => {

    const { state, dispatch } = useContext(LotteryTicketsContext);

    let [fraccionesCount, setFraccionesCount] = useState<number[]>([0, 0, 0]);

    useEffect(() => {
        updateFraccionesCount();       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const addTicket = (codigo: string) => {
        dispatch(
            addLotteryTicket({
                codigo
            })
        );
    };

    //private
    const updateFraccionesCount = () => {
        const fraccionesCountArr = [0, 0, 0];
        for (let i = 0; i < state.ticketsCounterCollection.allIds.length; i++) {
            fraccionesCountArr[i] = state.ticketsCounterCollection.byId[i + 1]
                ? state.ticketsCounterCollection.byId[i + 1].tickets.length
                : 0;
        }
        setFraccionesCount(fraccionesCountArr);
    }


    return {
        state,
        addTicket,
        fraccionesCount
    } as IUseLotteryTickets;
}
