import React, { useState } from "react";

import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { pencilOutline } from "ionicons/icons";

import "./add-ticket-manually.style.scss";
import { useLongActionIndicatorActions } from "../../../providers/long-action-indicator/long-action-indicator.hooks";
import { useTicketDevolutionActions } from "../../../providers/tickets-devolution/tickets-devolution.hook";


const AddTicketManually: React.FC = () => {

  const { addTicket } = useTicketDevolutionActions();
  const { showErrorMessage } = useLongActionIndicatorActions();

  const [showModal, setShowModal] = useState(false);

  const onCancel = () => {
    setShowModal(false);
  };

  const onConfirm = (formValues: any) => {
    if (!formValues.codigo || formValues.codigo.length !== 20) {
      showErrorMessage(
        `Código "${formValues.codigo}" no válido. Por favor verifique`
      );
      return false;
    }
    addTicket(formValues.codigo);
    setShowModal(false);
  };

  const onShowModalClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <IonButton onClick={onShowModalClick}>
        <IonIcon icon={pencilOutline} />
        <span className="pop-over-btn">Digitar código</span>
      </IonButton>

      <IonAlert
        isOpen={showModal}
        header={"Ingrese el código"}
        inputs={[
          {
            name: "codigo",
            type: "text",
            placeholder: "Escriba el código aquí",
            handler: (e) => {
              console.log(e);
            },
          },
        ]}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: onCancel,
          },
          {
            text: "Agregar",
            role: "submit",
            handler: onConfirm,
          },
        ]}
      />
    </>
  );
};

export default AddTicketManually;
