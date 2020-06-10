import { useContext, useEffect, useCallback } from "react";

import { isPlatform } from "@ionic/react";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { initialState, TicketsDevolutionStateContext, TicketsDevolutionDispatchContext } from "./tickets-devolution.context";

import {
    getTicketCounterReport as utilsGetTicketCounterReport,
    getFileReportStr as buildFileReportStr,
    getDevolutionFileName as buildDevolutionFileName
} from "./tickets-devolution.utils";

import { useLongActionIndicatorActions } from "../long-action-indicator/long-action-indicator.hooks";

import {
    ITicketsDevolutionState,
    ITicketDevolutionReport,
    ADD_LOTTERY_TICKET,
    SET_NEW_TICKET_DEVOLUTION_STATE,
    ITicket,
    UPDATE_TICKET_CANTIDAD,
    REMOVE_TICKET
} from "./tickets-devolution.types";

import { uploadFile } from "../../shared/utils/file-upload.util";
import { useTicketDevolutionReport } from "./tickets-devolution.report.hooks";
import { useContextValue } from "../../shared/hooks/use-context-value-hook";


export const useTicketDevolutionState = (): ITicketsDevolutionState => {
    return useContextValue<ITicketsDevolutionState>('TicketsDevolutionStateContext', TicketsDevolutionStateContext)
}

export interface ITicketDevolutionActions {
    startScanning: () => Promise<void>;
    addTicket: (codigo: string) => void;
    updateTicketCantidad: (newTicket: ITicket, previousCounter:number) => void;
    removeTicket: (ticket:ITicket) => void;
    sendDevolutionFile: (state: ITicketsDevolutionState, agente: string) => void;
}

export const useTicketDevolutionActions = () => {

    const dispatch = useContext(TicketsDevolutionDispatchContext);

    const { showLoading, showErrorMessage, showSuccessMessage } = useLongActionIndicatorActions();

    const addTicket = useCallback((codigo: string) => {
        dispatch({
            type: ADD_LOTTERY_TICKET,
            codigo
        });
    }, [dispatch]);

    const startScanning = async () => {

        if (isPlatform("mobileweb")) {

            addTicket('90150004640879113203');
            addTicket('90150004640351213203');
            addTicket('90150004640213713203');
            addTicket('90150004640715400101');
            addTicket('90150004640475119902');
            addTicket('90150004640249819902');

            return;
        }

        let data = {
            cancelled: false,
            text: "",
        };
        while (!data.cancelled) {
            data = await BarcodeScanner.scan({
                showTorchButton: true, // iOS and Android
                prompt: "Acerque la línea verde al código de barras del billete", // Android
                formats: "CODE_128",
            });

            if (!data.cancelled) {
                addTicket(data.text);
            }
        }
    }

    const updateTicketCantidad = (ticket: ITicket, newCounter:number) => {
        dispatch({
            type: UPDATE_TICKET_CANTIDAD,
            ticket,
            newCounter
        });
    }

    const removeTicket = (ticket:ITicket) => {
        dispatch({
            type: REMOVE_TICKET,
            ticket
        });
    }

    const sendDevolutionFile = async (state: ITicketsDevolutionState, agente: string) => {
        try {

            showLoading();

            const fileName = buildDevolutionFileName(state, agente);
            const dataToWrite = buildFileReportStr(state, agente);
            const uploadResult = await uploadFile(
                `http://52.42.49.101:8080/azenupl/FileUploadServlet`,
                fileName,
                dataToWrite
            );

            if (uploadResult.responseCode === 201 && uploadResult.response.toString() === '1') {
                showSuccessMessage(`Archivo devolución "${fileName.replace('.txt', '')}" cargado con éxito`);
                resetState();
            }
            else {
                showErrorMessage(JSON.stringify(uploadResult.response));
            }
        }
        catch (err) {
            showErrorMessage(err.toString());
        }
    }

    const resetState = () => {
        dispatch({
            type: SET_NEW_TICKET_DEVOLUTION_STATE,
            newState: initialState
        });
    }

    return {
        startScanning,
        addTicket,
        updateTicketCantidad,
        removeTicket,
        sendDevolutionFile
    } as ITicketDevolutionActions;
}


export interface IUseTicketDevolution extends ITicketDevolutionActions {
    state: ITicketsDevolutionState;
    ticketDevolutionCounterReport: ITicketDevolutionReport;

    sendDevolutionFile: () => void;
}

export const useTicketDevolution = (agente: string): IUseTicketDevolution => {

    const state = useTicketDevolutionState();
    const { startScanning, sendDevolutionFile: sendDevolutionFileAction, addTicket } = useTicketDevolutionActions();

    const [ticketDevolutionCounterReport, setTicketDevolutionCounterReport] = useTicketDevolutionReport();

    useEffect(() => {
        const newTicketCounterReport = utilsGetTicketCounterReport(state, agente);
        setTicketDevolutionCounterReport(newTicketCounterReport);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, agente, setTicketDevolutionCounterReport]);

    const sendDevolutionFile = () => {
        sendDevolutionFileAction(state, agente)
    }

    return {
        state,
        ticketDevolutionCounterReport,

        startScanning,
        addTicket,
        sendDevolutionFile
    } as IUseTicketDevolution;
}