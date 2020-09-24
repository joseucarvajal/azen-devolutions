import { useContext, useEffect, useCallback, useState } from "react";

import { isPlatform } from "@ionic/react";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { initialState, TicketsDevolutionStateContext, TicketsDevolutionDispatchContext } from "./tickets-devolution.context";

import {
    getTicketCounterReport as utilsGetTicketCounterReport,
    getFileReportStr as buildFileReportStr,
    getDevolutionFileName as buildDevolutionFileName,
    padLeft
} from "./tickets-devolution.utils";

import { useLongActionIndicatorActions } from "../long-action-indicator/long-action-indicator.hooks";

import {
    ITicketsDevolutionState,
    ITicketDevolutionReport,
    ADD_LOTTERY_TICKET,
    SET_NEW_TICKET_DEVOLUTION_STATE,
    ITicket,
    UPDATE_TICKET_CANTIDAD,
    REMOVE_TICKET,
    RESET_COUNTER,
    SET_LEERXFRACCIONES,
    IDevolutionEntity
} from "./tickets-devolution.types";

import { uploadFile } from "../../shared/api/file-upload.api";
import { useTicketDevolutionReport } from "./tickets-devolution.report.hooks";
import { useContextValue } from "../../shared/hooks/use-context-value-hook";
import { useGlobalSetupState } from "../global-setup/global-setup.hooks";
import { useAuthentication } from "../authentication/authentication.hooks";
import { saveTicketDevolutionEntity } from "./tickets-devolution.api";

export const useTicketDevolutionState = (): ITicketsDevolutionState => {
    return useContextValue<ITicketsDevolutionState>('TicketsDevolutionStateContext', TicketsDevolutionStateContext)
}

export interface ITicketDevolutionActions {
    readingInProgress: boolean;
    forceCounterReportUdate: boolean;
    startScanning: () => Promise<void>;
    addTicket: (codigo: string) => void;
    updateTicketCantidad: (newTicket: ITicket, previousCounter: number) => void;
    removeTicket: (ticket: ITicket) => void;
    resetCounter: (counter: number) => void;
    setLeerXFracciones: (value: boolean) => void;
    sendDevolutionFile: (state: ITicketsDevolutionState, agente: string) => void;
}

export const useTicketDevolutionActions = () => {

     const [ {user} ] = useAuthentication();

    const dispatch = useContext(TicketsDevolutionDispatchContext);
    const { showLoading, showErrorMessage, showSuccessMessage } = useLongActionIndicatorActions();
    const { apiBaseURL } = useGlobalSetupState();

    const [readingInProgress, setReadingInProgress] = useState(false);
    const [forceCounterReportUdate, setForceCounterReportUpdate] = useState(false);

    const addTicket = useCallback((codigo: string) => {
        dispatch({
            type: ADD_LOTTERY_TICKET,
            codigo
        });
    }, [dispatch]);

    const startScanning = async () => {

        setReadingInProgress(true);

        if (isPlatform("mobileweb")) {
            await startScanningFakeWeb();
        }
        else {
            await startScanningMobile();
        }

        setReadingInProgress(false);
    }

    const startScanningMobile = async () => {
        let data = {
            cancelled: false,
            text: "",
        };
        while (!data.cancelled) {
            data = await BarcodeScanner.scan({
                showTorchButton: true, // iOS and Android
                prompt: "Acerque la línea roja al código de barras del billete", // Android
                formats: "CODE_128",
            });

            if (!data.cancelled) {
                addTicket(data.text);
            }
        }
    }

    const startScanningFakeWeb = async () => {
        const max = 20;
        let counter = 0;
        let data = {
            cancelled: false,
            text: "",
        };
        while (!data.cancelled) {
            data = await produceScanFakeNumber(max, counter++);
            if (!data.cancelled) {
                addTicket(data.text);
            }
        }
    }

    const produceScanFakeNumber = (counter: number, max: number): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            let timer = setTimeout(() => {
                const serie = padLeft(Math.floor(Math.random() * 999), 3);
                const nro = padLeft(Math.floor(Math.random() * 9999), 4);
                const fraccion = padLeft(Math.floor(Math.random() * 3) + 1, 2);
                const codigo = `90150004640${nro}${serie}${fraccion}`;
                clearTimeout(timer);
                resolve({
                    cancelled: counter === max,
                    text: codigo
                })
            }, 0);
        });
    }

    const updateTicketCantidad = (ticket: ITicket, newCounter: number) => {
        dispatch({
            type: UPDATE_TICKET_CANTIDAD,
            ticket,
            newCounter
        });
    }

    const removeTicket = (ticket: ITicket) => {
        dispatch({
            type: REMOVE_TICKET,
            ticket
        });
    }

    const resetCounter = (counter: number) => {
        dispatch({
            type: RESET_COUNTER,
            counter
        });
    }

    const setLeerXFracciones = (value: boolean) => {
        dispatch({
            type: SET_LEERXFRACCIONES,
            value
        });
    }

    const sendDevolutionFile = async (state: ITicketsDevolutionState, agente: string) => {
        try {

            showLoading();

            const fileName = buildDevolutionFileName(state, agente);
            const dataToWrite = buildFileReportStr(state, agente);
            if (isPlatform("mobileweb")) {
                console.log(dataToWrite);
            }

            const uploadResult = await uploadFile(
                `${apiBaseURL}`,
                fileName,
                dataToWrite,
                user.tkna
            );

            if (uploadResult.responseCode === 201 && uploadResult.response.toString().length > 0) {

                const devolutionEntity = { 
                    agente: agente,
                    sorteo: state.sorteo,
                    archivoDevol: fileName
                } as IDevolutionEntity;

                const zservicesResponse = await saveTicketDevolutionEntity(devolutionEntity, apiBaseURL, user.tkna);
                alert(zservicesResponse.data);

                resetState();

                showSuccessMessage('Operación realizada con éxito');
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
        setForceCounterReportUpdate(!forceCounterReportUdate); //Force state report clean-up
    }

    return {
        readingInProgress,
        forceCounterReportUdate,
        startScanning,
        addTicket,
        updateTicketCantidad,
        removeTicket,
        resetCounter,
        setLeerXFracciones,
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
    const ticketDevolutionActions = useTicketDevolutionActions();
    const { readingInProgress, forceCounterReportUdate } = ticketDevolutionActions;

    const [ticketDevolutionCounterReport, setTicketDevolutionCounterReport] = useTicketDevolutionReport();

    useEffect(() => {
        if (readingInProgress === true) {
            return;
        }
        const newTicketCounterReport = utilsGetTicketCounterReport(state, agente);
        setTicketDevolutionCounterReport(newTicketCounterReport);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, readingInProgress, forceCounterReportUdate]);

    const sendDevolutionFile = () => {
        ticketDevolutionActions.sendDevolutionFile(state, agente);
    }

    return {
        state,

        ...ticketDevolutionActions,

        ticketDevolutionCounterReport,
        sendDevolutionFile,
    } as IUseTicketDevolution;
}