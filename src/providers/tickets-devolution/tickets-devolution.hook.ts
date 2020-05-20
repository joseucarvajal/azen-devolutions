import { useContext, useEffect, useCallback } from "react";

import { isPlatform } from "@ionic/react";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { initialState, TicketsDevolutionContext } from "./tickets-devolution.context";

import {
    getTicketCounterReport as utilsGetTicketCounterReport,
    getFileReportStr,
    padLeft
} from "./tickets-devolution.utils";

import {
    START_LOADING,
    STOP_LOADING
} from "../long-action-indicator/long-action-indicator.types";
import { useLongActionIndicatorDispatch } from "../long-action-indicator/long-action-indicator.hooks";

import {
    IState,
    ITicketDevolutionReport,
    ADD_LOTTERY_TICKET,
    SET_NEW_TICKET_DEVOLUTION_STATE
} from "./tickets-devolution.types";

import { uploadFile } from "../../shared/utils/file-upload.util";
import { useTicketDevolutionReport } from "./tickets-devolution.report.hooks";

export interface IUseTicketDevolution {
    state: IState;
    ticketDevolutionCounterReport: ITicketDevolutionReport;

    startScanning: () => Promise<void>;
    addTicket: (codigo: string) => void;
    sendReportFile: () => void;
}

export const useTicketDevolution = (agente: string): IUseTicketDevolution => {

    const {
        state,
        dispatch,
    } = useContext(TicketsDevolutionContext);

    const longActionDispatch = useLongActionIndicatorDispatch();

    const [ticketDevolutionCounterReport, setTicketDevolutionCounterReport] = useTicketDevolutionReport();

    const addTicket = useCallback((codigo: string) => {
        dispatch({
            type: ADD_LOTTERY_TICKET,
            codigo
        });
    }, [dispatch]);

    useEffect(() => {
        const newTicketCounterReport = utilsGetTicketCounterReport(state, agente);
        setTicketDevolutionCounterReport(newTicketCounterReport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, agente]);

    const startScanning = async () => {

        if (isPlatform("mobileweb")) {
            setTimeout(() => {
                addTicket('90150004640715400101');
            }, 1000);

            setTimeout(() => {
                addTicket('90150004640475119902');
            }, 1000);

            setTimeout(() => {
                addTicket('90150004640879113203');
            }, 1000);

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


    // const sendReportFile = () => {
    //     longActionDispatch({
    //         type: START_LOADING                
    //     })                        

    //     setTimeout(() => {
    //         sendReportFileFn();
    //     }, 2000);
    // }


    const sendReportFile = async () => {
        try {

            longActionDispatch({
                type: START_LOADING
            })

            const dateNow = new Date();
            const { codigoLoteria, sorteo } = state;
            const hour = padLeft(dateNow.getHours(), 2);
            const minute = padLeft(dateNow.getMinutes(), 2);
            const second = padLeft(dateNow.getSeconds(), 2);
            const fileName = `da_${codigoLoteria}_${sorteo}_${agente}_${hour}${minute}${second}.txt`;

            const dataToWrite = getFileReportStr(state, agente);

            const uploadResult = await uploadFile(
                `http://52.42.49.101:8080/azenupl/FileUploadServlet`,
                fileName,
                dataToWrite
            );
            if (uploadResult.responseCode === 201 && uploadResult.response.toString() === '1') {
                longActionDispatch({
                    type: STOP_LOADING,
                    resultMessage: `Archivo cargado: ${fileName} con éxito`
                });
                dispatch({
                    type: SET_NEW_TICKET_DEVOLUTION_STATE,
                    newState: initialState
                });
            }
            else {
                longActionDispatch({
                    type: STOP_LOADING,
                    status: 'error',
                    resultMessage: JSON.stringify(uploadResult.response)
                });
            }
        }
        catch (err) {
            longActionDispatch({
                type: STOP_LOADING,
                status: 'error',
                resultMessage: err.toString()
            });
        }
    }

    return {
        state,
        ticketDevolutionCounterReport,
        startScanning,
        addTicket,
        sendReportFile
    } as IUseTicketDevolution;
}