import { useState } from "react";

import { BarcodeScanner } from "@ionic-native/barcode-scanner";

/**
 * Starts scanning barcodes into a looop and triggers each lecture value
 */
export const useBarcodeScan = (): [string, () => Promise<void>] => {

    const [barcodeValue, setBarCodeValue] = useState('');

    /**
     * start scanning loop until user cancel with back button
     */
    const startScanning = async () => {
        let data = {
            cancelled: false,
            text: "",
        };
        while (!data.cancelled) {
            data = await BarcodeScanner.scan({
                showTorchButton: true,
                prompt: "Acerque la línea verde al código de barras del billete", // Android
                formats: "CODE_128",
            });

            if (!data.cancelled) {
                setBarCodeValue(data.text);
            }
        }
    };
   
    return [barcodeValue, startScanning];
}