import React, { useState, useCallback } from "react";

import "./ticket-devolution.style.scss";

import { isPlatform, IonButton, IonAlert } from "@ionic/react";

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

import { useLotteryTickets } from "../../providers/lottery-tickets/lottery-tickets.hooks";
import TicketCountList from "../../components/ticket-count-list/ticket-count-list.component";
import InfoSorteo from "../../components/info-sorteo/info-sorteo";
import TicketCountTotal from "../../components/ticket-count-total/ticket-count-total.component";
import FooterInfo from "../../components/footer-info/footer-info.component";
import EmptyResultMsgComponent from "../../components/empty-results-msg/empty-results-msg.component";

const TicketDevolutionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  //TODO: replace with real agente value
  const agente = "azen";

  const { state, ticketCounterReport, startScanning, addTicket, sendReportFile } = useLotteryTickets(
    agente
  );

  const [code, setCode] = useState("90150004640715400101");
  const [showSendFileConfirm, setShowSendFileConfirm] = useState(false);

  console.log("refresh devolution page");

  const onSendReportFile = useCallback(() => {
    setShowSendFileConfirm(true);
  }, [setShowSendFileConfirm]);

  const onCancelSendFile = () => {
    setShowSendFileConfirm(false);
  }

  const onConfirmSendFile = () => {
    sendReportFile();
  }

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
          </div>
          <div className="ticket-devol-footer">
            <FooterInfo />
          </div>


          <IonAlert
          isOpen={showSendFileConfirm}
          header={'Confirmar envío'}
          message={`Lectura correspondiente a <strong>${ticketCounterReport.fractionsTotalCount}</strong> fracciones. ¿Confirma envío?`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: onCancelSendFile
            },
            {
              text: 'Enviar',
              handler: onConfirmSendFile
            }
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

export default TicketDevolutionPage;
