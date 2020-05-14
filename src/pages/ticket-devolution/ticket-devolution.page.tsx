import React, { useState } from "react";

import "./ticket-devolution.style.scss";

import { isPlatform, IonButton } from "@ionic/react";

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
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { useParams } from "react-router";

import { useLotteryTickets } from "../../providers/lottery-tickets/lottery-tickets.hooks";
import TicketCountList from "../../components/ticket-count-list/ticket-count-list.component";
import InfoSorteo from "../../components/info-sorteo/info-sorteo";
import TicketCountTotal from "../../components/ticket-count-total/ticket-count-total.component";
import FooterInfo from "../../components/footer-info/footer-info.component";
import EmptyResultMsgComponent from "../../components/empty-results-msg/empty-results-msg.component";

const TicketDevolutionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { state, addTicket } = useLotteryTickets("agente");

  const [code, setCode] = useState("90150004640715400101");

  console.log("refresh devolution page");

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
          <div className="ticket-devol__content">
            <InfoSorteo />
            <TicketCountList />
            <TicketCountTotal />

            {state.sorteo ? (
              <div className="send-dev">
                <IonButton
                  color="secondary"
                  size="small"
                  className="azn-button-capitalize send-dev-btn"
                >
                  Enviar devolución
                </IonButton>
              </div>
            ) : (
              <EmptyResultMsgComponent />
            )}

            {isPlatform("mobileweb") && (
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
                &nbsp;&nbsp;
                <input
                  type="button"
                  value="Add"
                  onClick={() => {
                    addTicket({ codigo: code });
                  }}
                />
              </div>
            )}

            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              onClick={startScanning}
            >
              <IonFabButton color="primary">
                <IonIcon icon={barcodeOutline} />
              </IonFabButton>
            </IonFab>
          </div>
          <div className="ticket-devol-footer">
            <FooterInfo />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TicketDevolutionPage;
