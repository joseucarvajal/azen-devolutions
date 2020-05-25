/* eslint-disable react-hooks/exhaustive-deps */
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
import { arrowBack } from "ionicons/icons";

import './tickets-editor-main.style.scss';

import { useEffect, useState } from "react";
import TicketSearch from "../ticket-search/ticket-search.component";
import TicketDetailList from "../ticket-detail-list/ticket-detail-list.component";

interface IProps {
  show: boolean;
  hide: () => void;
}

const TicketsEditorMain: React.FC<IProps> = (props) => {
  const { show, hide } = props;

  const { ticketList, filterOutTickets } = useTicketEditor();
  const [searchNumber, setSearchNumber] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    filterOutTickets(searchNumber);
  }, [searchNumber]);

  return (
    <IonModal isOpen={show} swipeToClose={true}>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="end">
            <span className="ver-num__title">Ver numeración</span>
          </IonTitle>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                hide();
              }}
            >
              <IonIcon icon={arrowBack} />
              Volver
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ticket-editor">
          <TicketSearch onSearch={setSearchNumber} />
          <TicketDetailList ticketList={ticketList}></TicketDetailList>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TicketsEditorMain;
