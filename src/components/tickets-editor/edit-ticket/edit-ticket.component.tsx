import React from "react";

import "./edit-ticket.style.scss";

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonSelectOption,
  IonSelect,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import TicketDetail from "../ticket-detail/ticket-detail.component";
import { arrowBack } from "ionicons/icons";
import { useTicketDevolutionActions } from "../../../providers/tickets-devolution/tickets-devolution.hook";

const cantidades = [1, 2, 3];

interface IProps {
  ticket: ITicket;
  onHide: () => void;
}

const EditTicket: React.FC<IProps> = ({ ticket, onHide }) => {
  const { updateTicketCantidad } = useTicketDevolutionActions();

  return (
    <IonModal isOpen={ticket !== null} onDidDismiss={onHide}>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="end">
            <span className="ver-num__title">Detalle de número</span>
          </IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={onHide}>
              <IonIcon icon={arrowBack} />
              Volver
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="edit-ticket">
          <TicketDetail ticket={ticket} />

          <IonList>
            <IonItem>
              <IonLabel>Cambiar cantidad</IonLabel>
              <IonSelect
                selectedText={`${ticket.cantidadFracciones}`}
                interfaceOptions={{
                  header: "Seleccione nueva cantidad",
                }}
                onIonChange={(e) => {
                  updateTicketCantidad(ticket, e.detail.value);
                }}
                interface="popover"
              >
                {cantidades
                  .filter((c) => c !== ticket.cantidadFracciones)
                  .map((v) => (
                    <IonSelectOption key={v} value={v}>
                      {v}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default EditTicket;
