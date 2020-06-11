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
import TicketsDevolutionMenu from "../menu/tickets-devolution-menu.component";
import { OptionMenu } from "../../../providers/tickets-devolution/tickets-devolution.types";
import TicketsEditor from "../../tickets-editor/tickets-editor/tickets-editor.component";
import { useAuthenticationState } from "../../../providers/authentication/authentication.hooks";

const TicketDevolutionMain: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { userName: agente } = useAuthenticationState();

  const {
    ticketDevolutionCounterReport,
    startScanning,
    resetCounter,
    sendDevolutionFile,
  } = useTicketDevolution(agente);

  const [showSendFileConfirm, setShowSendFileConfirm] = useState(false);
  const [optionMenuSelected, setOptionMenuSelected] = useState<OptionMenu>();
  const [counterToEdit, setCounterToEdit] = useState(0);

  const [counterToReset, setCounterToReset] = useState(0);

  console.log("refresh devolution page");

  const onSendReportFile = () => {
    setShowSendFileConfirm(true);
  };

  const onCancelSendReportFile = () => {
    setShowSendFileConfirm(false);
  };

  const onConfirmSendReportFile = () => {
    sendDevolutionFile();
    setShowSendFileConfirm(false);
  };

  const onResetCounter = (counter: number) => {
    setCounterToReset(counter);
  };

  const onCancelResetCounter = () => {
    setCounterToReset(0);
  };

  const onConfirmResetCounter = () => {
    resetCounter(counterToReset);
    setCounterToReset(0);
  };

  const onMenuOptionClicked = (option: OptionMenu) => {
    setOptionMenuSelected(option);
  };

  const hideCurrentMenuOption = () => {
    setOptionMenuSelected(undefined);
    setCounterToEdit(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonButtons slot="end">
            <TicketsDevolutionMenu
              handleOptionClick={onMenuOptionClicked}
            ></TicketsDevolutionMenu>
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ticket-devol-page">
          <div className="ticket-devol__content">
            <InfoSorteo />

            <TicketCountList
              onCounterRevisar={setCounterToEdit}
              onCounterReiniciar={onResetCounter}
            />

            <TicketCountTotal />

            {ticketDevolutionCounterReport?.fractionsTotalCount > 0 ? (
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
                handler: onCancelSendReportFile,
              },
              {
                text: "Enviar",
                handler: onConfirmSendReportFile,
              },
            ]}
          />

          <IonAlert
            isOpen={counterToReset !== 0}
            header={"Confirmar reinicio"}
            message={`¿Desea reiniciar el conteo para la fracción <strong>${counterToReset}</strong>?`}
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: onCancelResetCounter,
              },
              {
                text: "Reiniciar",
                handler: onConfirmResetCounter,
              },
            ]}
          />
        </div>

        {optionMenuSelected === "DIGITAR_CODIGO" && (
          <AddTicketManually hide={hideCurrentMenuOption} />
        )}

        {(optionMenuSelected === "VER_NUMERACION" || counterToEdit !== 0) && (
          <TicketsEditor
            hide={hideCurrentMenuOption}
            counterToEdit={counterToEdit}
          />
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
      </IonContent>
    </IonPage>
  );
};

export default TicketDevolutionMain;
