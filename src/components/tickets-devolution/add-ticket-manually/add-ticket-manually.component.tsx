import React from "react";

import { IonAlert } from "@ionic/react";

import { useLongActionIndicatorActions } from "../../../providers/long-action-indicator/long-action-indicator.hooks";
import { useTicketDevolutionActions } from "../../../providers/tickets-devolution/tickets-devolution.hook";

interface IProps {
  hide: () => void;
}
const AddTicketManually: React.FC<IProps> = ({hide}) => {

  const { addTicket } = useTicketDevolutionActions();
  const { showErrorMessage } = useLongActionIndicatorActions();

  const onCancel = () => {
    hide();
  };

  const onConfirm = (formValues: any) => {
    if (!formValues.codigo || formValues.codigo.length !== 20) {
      showErrorMessage(
        `Código "${formValues.codigo}" no válido. Por favor verifique`
      );
      return false;
    }
    addTicket(formValues.codigo);
    hide();
  };

  return (
    <IonAlert
      isOpen={true}
      header={"Ingrese el código"}
      inputs={[
        {
          name: "codigo",
          type: "text",
          placeholder: "Escriba el código aquí",
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
  );
};

export default AddTicketManually;
