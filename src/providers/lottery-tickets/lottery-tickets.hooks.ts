import { useContext, useEffect } from "react";

import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { IState, ITicketCounterReport } from "./lottery-tickets.contracts";
import { addLotteryTicket } from "./lottery-tickets.actions";
import { LotteryTicketsContext } from "./lottery-tickets.provider";
import { IAddLotteryTicketParams } from "./lottery-tickets.types";

import { getTicketCounterReport as utilsGetTicketCounterReport, getFileReportStr, padLeft } from "./lottery-tickets.utils";

export interface IUseLotteryTickets {
    state: IState;
    ticketCounterReport: ITicketCounterReport;

    startScanning: () => Promise<void>;
    addTicket: (params: IAddLotteryTicketParams) => void;
    sendReportFile: () => void;
}

export const useLotteryTickets = (agente: string): IUseLotteryTickets => {

    const { state, dispatch, setTicketCounterReport, ticketCounterReport } = useContext(LotteryTicketsContext);

    useEffect(() => {
        updateReport(agente);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const addTicket = (params: IAddLotteryTicketParams) => {
        dispatch(
            addLotteryTicket(params)
        );
    };

    const startScanning = async () => {
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
                addTicket({
                    codigo: data.text,
                });
            }
        }
    };

    const sendReportFile = async () => {
        try {
            const dataToWrite = getFileReportStr(state, agente);

            const dateNow = new Date();
            const { codigoLoteria, sorteo } = state;
            const fileName = `da_${codigoLoteria}_${sorteo}_${agente}_${padLeft(dateNow.getHours(), 2)}${padLeft(dateNow.getMinutes(), 2)}${padLeft(dateNow.getSeconds(), 2)}.txt`;

            console.log(`filename`, fileName);

            const fileEntry = await File.createFile(File.dataDirectory, fileName, true);
            const blob = new Blob([dataToWrite], { type: 'text/plain' });
            File.writeFile(File.dataDirectory, fileName, blob, { replace: true, append: false });

            const fileTransferObj = FileTransfer.create();
            const uploadResult = await fileTransferObj
                .upload(fileEntry.nativeURL,
                    `http://52.42.49.101:8080/azenupl/FileUploadServlet`,
                    {
                        fileKey: 'file',
                        fileName: fileName,
                        mimeType: 'text/plain'
                    });

            if (uploadResult.responseCode === 201 && uploadResult.response.toString() === '1') {
                alert(`Archivo cargado: ${fileName} con éxito`);
            }

        }
        catch (err) {
            alert(`error ${JSON.stringify(err)}`);
        }
    }

    const updateReport = (agente: string) => {
        const newTicketCounterReport = utilsGetTicketCounterReport(state, agente);
        setTicketCounterReport(newTicketCounterReport);
    };

    return {
        state,
        ticketCounterReport,
        startScanning,
        addTicket,
        sendReportFile
    } as IUseLotteryTickets;
}