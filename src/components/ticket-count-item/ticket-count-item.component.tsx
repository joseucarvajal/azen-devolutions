import React from "react";

import { IonButton } from "@ionic/react";

import { ITicketCount } from "../../providers/lottery-tickets/lottery-tickets.contracts";

import "./ticket-count-item.style.scss";

interface TicketCountItemProps {
  key: any;
  ticketCountObj: ITicketCount;
  fractionsCount: number;
}

const TicketCountItem: React.FC<TicketCountItemProps> = ({
  ticketCountObj,
  fractionsCount,
}) => {

  const ticketsCount = ticketCountObj.tickets.length;
  const nroFraction = ticketCountObj.codigo;
  const cssClassNameByCodigo = `ticket-count-item__frac-nro ticket-count-item__frac--${nroFraction}`;

  return (
    <div className="ticket-count-item">
      <div className="ticket-count-item__frac">
        <div className={cssClassNameByCodigo}></div>
        <span className="ticket-count-item__badge">{ticketsCount}</span>
        <div className="ticket-count-item__frac-txt"></div>
      </div>
      <div className="ticket-count-item__data">
        <div className="ticket-count-item__lbl">
          <span className="azn-bolder-1">
          {ticketsCount} billetes - {fractionsCount} fracciones
          </span>
        </div>
        <div className="ticket-count-item__actions">
          <IonButton
            color="secondary"
            size="small"
            className="azn-button-capitalize ticket-count-item__btn"
          >
            Corregir
          </IonButton>
          <IonButton
            color="secondary"
            size="small"
            className="azn-button-capitalize ticket-count-item__btn"
            style={{color:'white'}}
          >
            Reiniciar
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default TicketCountItem;
