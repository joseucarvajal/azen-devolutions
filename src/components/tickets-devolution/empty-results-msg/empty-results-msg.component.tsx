import React, { useContext, useMemo } from "react";

import { IonIcon } from "@ionic/react";

import { barcodeOutline } from "ionicons/icons";

import "./empty-results-msg.style.scss";

import { TicketsDevolutionContext } from "../../../providers/tickets-devolution/tickets-devolution.context";

const EmptyResultMsgComponent = () => {
  const { ticketDevolutionCounterReport } = useContext(TicketsDevolutionContext);

  return useMemo(() => {
    return (
      <div className="msg">
        Haga clic en{" "}
        <div className="msg__scan_icon-container">
          <span className="msg__scan-icon">
            <IonIcon icon={barcodeOutline} />
          </span>{" "}
        </div>
        para empezar la lectura
      </div>
    );
  }, [ticketDevolutionCounterReport]);
};

export default EmptyResultMsgComponent;
