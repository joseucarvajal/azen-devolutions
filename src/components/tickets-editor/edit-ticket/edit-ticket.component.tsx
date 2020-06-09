import React, { useState } from "react";

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
  IonAlert,
} from "@ionic/react";

import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import TicketDetail from "../ticket-detail/ticket-detail.component";
import { arrowBack, trashBinOutline } from "ionicons/icons";
import { useTicketDevolutionActions } from "../../../providers/tickets-devolution/tickets-devolution.hook";

const cantidades = [1, 2, 3];

interface IProps {
  ticket: ITicket;
  onHide: () => void;
}

const EditTicket: React.FC<IProps> = ({ ticket, onHide }) => {
  const { updateTicketCantidad, removeTicket } = useTicketDevolutionActions();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <IonModal isOpen={ticket !== null} onDidDismiss={onHide}>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="end">
            <span className="ver-num__title">Información de número</span>
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
        <div className="btn-eliminar">
          <IonButton
            color="tertiary"
            className="azn-button-capitalize"
            onClick={() => {
              setShowDeleteConfirm(true);
            }}
          >
            <IonIcon icon={trashBinOutline} />
            &nbsp; Eliminar lectura
          </IonButton>
        </div>
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

          <div className="btn-volver">
            <IonButton
              color="secondary"
              className="azn-button-capitalize"
              onClick={onHide}
            >
              <IonIcon icon={arrowBack} />
              Volver
            </IonButton>
          </div>
        </div>

        <IonAlert
          isOpen={showDeleteConfirm}
          header="Confirmación"
          message={`¿Desea eliminar el número: ${ticket.numero}, serie ${ticket.serie} de la lectura?`}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => {
                setShowDeleteConfirm(false);
              },
            },
            {
              text: "Eliminar",
              role: "button",
              handler: () => {
                removeTicket(ticket);
              },
            },
          ]}
        />
      </IonContent>
    </IonModal>
  );
};

export default EditTicket;
