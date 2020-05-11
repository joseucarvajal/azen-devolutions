import React, { useState } from "react";

import { isPlatform } from "@ionic/react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { barcodeOutline } from "ionicons/icons";

import { useParams } from "react-router";

import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { useLotteryTickets } from "../../providers/lottery-tickets/lottery-tickets.hooks";

import TicketCountList from "../../components/ticket-count-list/ticket-count-list.component";

import "./ticket-devolution.style.scss";

const TicketDevolutionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { state, addTicket } = useLotteryTickets();

  const [code, setCode ] = useState('');

  console.log('state', state);

  const startScanning = async () => {
    while (true) {
      const data = await BarcodeScanner.scan({
        showTorchButton: true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        prompt: "Acerque la línea verde al código de barras del billete", // Android
        formats: "CODE_128",
        showFlipCameraButton: true,
      });

      addTicket({
        codigo: data.text,
      });

      if (data.cancelled) {
        break;
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>        
          <div className="ticket-devol-page">
            <TicketCountList></TicketCountList>
            <div className="tickets-count-total azn-bolder-1">
              <span>Total fracciones:</span>
              <span className="tickets-count-total__vlr">
                {state.ticketsCounter}
              </span>
            </div>

            {isPlatform("mobileweb") && (
              <div>
                <input type="text" value={code} onChange={(e)=>{ setCode(e.target.value); }}/>
                <input type="button" value="Add" onClick={()=>{ addTicket({codigo:code}); }}/>
              </div>
            )}

            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              onClick={startScanning}
            >
              <IonFabButton>
                <IonIcon icon={barcodeOutline} />
              </IonFabButton>
            </IonFab>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default TicketDevolutionPage;
