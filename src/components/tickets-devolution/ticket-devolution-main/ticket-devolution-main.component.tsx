import React, { useState } from "react";

import "./ticket-devolution-main.style.scss";

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
  isPlatform,
  IonButton,
  IonAlert,
} from "@ionic/react";

import { barcodeOutline } from "ionicons/icons";

import { useTicketDevolution } from "../../../providers/tickets-devolution/tickets-devolution.hook";
import TicketCountList from "../ticket-count-list/ticket-count-list.component";
import InfoSorteo from "../info-sorteo/info-sorteo";
import TicketCountTotal from "../ticket-count-total/ticket-count-total.component";
import FooterInfo from "../footer-info/footer-info.component";
import EmptyResultMsgComponent from "../empty-results-msg/empty-results-msg.component";

import AddTicketManually from "../add-ticket-manually/add-ticket-manually.component";
import { useParams } from "react-router";

const TicketDevolutionMain: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  //TODO: replace with real agente value
  const agente = "azen";

  const {
    state,
    ticketDevolutionCounterReport,
    startScanning,
    addTicket,
    sendReportFile,
  } = useTicketDevolution(agente);

  const [code, setCode] = useState("90150004640831702501");
  const [showSendFileConfirm, setShowSendFileConfirm] = useState(false);

  console.log("refresh devolution page", showSendFileConfirm);

  const onSendReportFile = () => {
    setShowSendFileConfirm(true);
  };

  const onCancelSendFile = () => {
    setShowSendFileConfirm(false);
  };

  const onConfirmSendFile = () => {
    sendReportFile();
    setShowSendFileConfirm(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonButtons slot="end">
            <AddTicketManually addTicket={addTicket}></AddTicketManually>
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
              <div className="send-devolution">
                <IonButton
                  color="secondary"
                  size="small"
                  className="azn-button-capitalize send-devolution__btn"
                  onClick={onSendReportFile}
                >
                  Enviar devolución
                </IonButton>
              </div>
            ) : (
              <EmptyResultMsgComponent />
            )}
          </div>
          <div className="ticket-devol-footer">
            <FooterInfo />
          </div>

          <IonAlert
            isOpen={showSendFileConfirm}
            header={"Confirmar envío"}
            message={`Lectura correspondiente a <strong>${ticketDevolutionCounterReport.fractionsTotalCount}</strong> fracciones. ¿Confirma envío?`}
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: onCancelSendFile,
              },
              {
                text: "Enviar",
                handler: onConfirmSendFile,
              },
            ]}
          />
        </div>

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
      </IonContent>
    </IonPage>
  );
};

export default TicketDevolutionMain;
