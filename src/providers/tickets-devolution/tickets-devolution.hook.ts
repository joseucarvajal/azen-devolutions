import { useContext, useEffect, useCallback } from "react";

import { IState, ITicketDevolutionCounterReport } from "./tickets-devolution.contracts";
import { addLotteryTicket } from "./tickets-devolution.actions";
import { LotteryTicketsContext } from "./tickets-devolution.provider";
import { IAddLotteryTicketParams } from "./tickets-devolution.types";

import {
    getTicketCounterReport as utilsGetTicketCounterReport,
    getFileReportStr,
    padLeft
} from "./tickets-devolution.utils";

import { useBarcodeScan } from "../../shared/hooks/barcode-scan.hook";
import { uploadFile } from "../../shared/utils/file-upload.util";

export interface IUseTicketDevolution {
    state: IState;
    ticketDevolutionCounterReport: ITicketDevolutionCounterReport;

    startScanning: () => Promise<void>;
    addTicket: (params: IAddLotteryTicketParams) => void;
    sendReportFile: () => void;
}

export const useTicketDevolution = (agente: string): IUseTicketDevolution => {

    const {
        state,
        dispatch,
        ticketDevolutionCounterReport,
        setTicketDevolutionCounterReport,
    } = useContext(LotteryTicketsContext);

    const [barcode, startScanBarCodes] = useBarcodeScan();

    const addTicket = useCallback((params: IAddLotteryTicketParams) => {
        dispatch(
            addLotteryTicket(params)
        );
    }, [dispatch]);

    useEffect(() => {
        addTicket({
            codigo: barcode
        });
    }, [barcode, addTicket]);

    useEffect(() => {
        const newTicketCounterReport = utilsGetTicketCounterReport(state, agente);
        setTicketDevolutionCounterReport(newTicketCounterReport);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, setTicketDevolutionCounterReport]);

    const startScanning = () => startScanBarCodes();

    const sendReportFile = async () => {
        try {
            const dataToWrite = getFileReportStr(state, agente);

            const dateNow = new Date();
            const { codigoLoteria, sorteo } = state;
            const hour = padLeft(dateNow.getHours(), 2);
            const minute = padLeft(dateNow.getMinutes(), 2);
            const second = padLeft(dateNow.getSeconds(), 2);
            const fileName = `da_${codigoLoteria}_${sorteo}_${agente}_${hour}${minute}${second}.txt`;            

            const uploadResult = await uploadFile(
                `http://52.42.49.101:8080/azenupl/FileUploadServlet`,
                fileName,
                dataToWrite
            );
            if (uploadResult.responseCode === 201 && uploadResult.response.toString() === '1') {
                alert(`Archivo cargado: ${fileName} con éxito`);
            }
        }
        catch (err) {
            alert(`error ${JSON.stringify(err)}`);
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