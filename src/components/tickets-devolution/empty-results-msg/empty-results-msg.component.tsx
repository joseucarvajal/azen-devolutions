import React from "react";

import { IonIcon } from "@ionic/react";
import { barcodeOutline } from "ionicons/icons";

import "./empty-results-msg.style.scss";
import { useTicketDevolutionActions, useTicketDevolutionState } from "../../../providers/tickets-devolution/tickets-devolution.hook";

const EmptyResultMsgComponent: React.FC = () => {

  const { startScanning } = useTicketDevolutionActions();
  const { leerXFracciones } = useTicketDevolutionState();

  return (
    <div className="msg">
      Haga clic en{" "}
      <div className="msg__scan_icon-container">
        <span className="msg__scan-icon" onClick={startScanning}>
          <IonIcon icon={barcodeOutline} />
        </span>{" "}
      </div>
      para iniciar la lectura por <b><u>{leerXFracciones ? 'Fracciones' : 'Billetes'}</u></b>
    </div>
  );
};

export default EmptyResultMsgComponent;
