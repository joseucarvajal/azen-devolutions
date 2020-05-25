import React, { useState } from "react";

import { IonAlert } from "@ionic/react";

import { useLongActionIndicatorActions } from "../../../providers/long-action-indicator/long-action-indicator.hooks";
import { useTicketDevolutionActions } from "../../../providers/tickets-devolution/tickets-devolution.hook";

interface IProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
const AddTicketManually: React.FC<IProps> = (props) => {

  const { addTicket } = useTicketDevolutionActions();
  const { showErrorMessage } = useLongActionIndicatorActions();

  const {show, setShow} = props;

  const onCancel = () => {
    setShow(false);
  };

  const onConfirm = (formValues: any) => {
    if (!formValues.codigo || formValues.codigo.length !== 20) {
      showErrorMessage(
        `Código "${formValues.codigo}" no válido. Por favor verifique`
      );
      return false;
    }
    addTicket(formValues.codigo);
    setShow(false);
  };

  return (
    <IonAlert
      isOpen={show}
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
