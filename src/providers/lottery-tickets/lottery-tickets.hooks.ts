import { useContext, useEffect } from "react";

import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { File } from '@ionic-native/file';

import { IState, ITicketCounterReport } from "./lottery-tickets.contracts";
import { addLotteryTicket } from "./lottery-tickets.actions";
import { LotteryTicketsContext } from "./lottery-tickets.provider";
import { IAddLotteryTicketParams } from "./lottery-tickets.types";

import { getTicketCounterReport as utilsGetTicketCounterReport, getFileReportStr } from "./lottery-tickets.utils";

export interface IUseLotteryTickets {
    state: IState;
    ticketCounterReport: ITicketCounterReport;

    startScanning: () => Promise<void>;
    addTicket: (params: IAddLotteryTicketParams) => void;
    sendReportFile: (agente:string) => void;
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

    const sendReportFile = async (agente:string) => {    
        const fileName = 'elubasfile.txt';
        File.createFile(File.dataDirectory, fileName, true);
        const dataToWrite = getFileReportStr(state, agente);

        console.log(dataToWrite);

        const blob = new Blob([dataToWrite], { type: 'text/plain' });
        File.writeFile(File.dataDirectory, fileName, blob, { replace: true, append: false });

        const strFile = await File.readAsText(File.dataDirectory, fileName);
        alert(strFile);
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