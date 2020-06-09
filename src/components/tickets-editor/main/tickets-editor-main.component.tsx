import * as React from "react";
import { useTicketEditor } from "../../../providers/tickets-editor/tickets-editor.hooks";
import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowBack, reorderFourOutline, warning } from "ionicons/icons";

import "./tickets-editor-main.style.scss";

import TicketSearch from "../ticket-search/ticket-search.component";
import TicketDetailList from "../ticket-detail-list/ticket-detail-list.component";

interface IProps {
  show: boolean;
  hide: () => void;
}

const TicketsEditorMain: React.FC<IProps> = (props) => {
  const { show, hide } = props;

  const { ticketList, searchNumber, setSearchNumber } = useTicketEditor();

  return (
    <IonModal isOpen={show} onDidDismiss={hide}>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="end">
            <span className="ver-num__title">Listado numeración</span>
          </IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={hide}>
              <IonIcon icon={arrowBack} />
              Volver
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ticket-editor">
          {ticketList?.length > 0 ? (
            <>
              <TicketSearch onSearch={setSearchNumber} />
              <TicketDetailList ticketList={ticketList}></TicketDetailList>
            </>
          ) : (
            <div className="no-tickets">
              <div className="no-tickets-found">
                <span className="no-tickets-found__warn">
                  <IonIcon icon={warning} />
                </span>
                <div>
                  No se han encontrado billetes con el número{" "}
                  <span className="no-tickets-found__nro">{searchNumber}</span>
                </div>
              </div>

              <IonButton
                color="secondary"
                className="azn-button-capitalize"
                onClick={() => {
                  setSearchNumber(undefined);
                }}
              >
                <IonIcon icon={reorderFourOutline} />
                Mostrar todos
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TicketsEditorMain;
