import React from "react";

import { IonButton } from "@ionic/react";

import { ITicketCount } from "../../providers/lottery-tickets/lottery-tickets.contracts";

import "./ticket-count-item.style.scss";

interface TicketCountItemProps {
  key:any;
  ticketCountObj: ITicketCount;
}

const TicketCountItem: React.FC<TicketCountItemProps> = ({ticketCountObj}) => {

  const ticketsCount = ticketCountObj.tickets.length;
  const nroFraction = ticketCountObj.codigo;

  const codigoCssClassName = `ticket-count-item__frac-nro ticket-count-item__frac--${nroFraction}`;

  return (
    <div className="ticket-count-item">
      <div className="ticket-count-item__frac">
        <div className={codigoCssClassName}></div>
        <span className="ticket-count-item__badge">{ticketsCount}</span>
        <div className="ticket-count-item__frac-txt"></div>
      </div>
      <div className="ticket-count-item__data">
        <div className="ticket-count-item__lbl">
          {nroFraction} Fracción - {ticketsCount} billetes
        </div>
        <div className="ticket-count-item__actions">
          <IonButton
            color="primary"
            size="small"
            className="ticket-count-item__btn"
          >
            Corregir
          </IonButton>
          <IonButton
            color="primary"
            size="small"
            className="ticket-count-item__btn"
          >
            Escanear de nuevo
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default TicketCountItem;
