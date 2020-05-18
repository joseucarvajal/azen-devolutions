import React, { useState } from "react";

import "./ticket-devolution-main.style.scss";

import {
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

const TicketDevolutionMain: React.FC = () => {
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
    <>
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
    </>
  );
};

export default TicketDevolutionMain;
