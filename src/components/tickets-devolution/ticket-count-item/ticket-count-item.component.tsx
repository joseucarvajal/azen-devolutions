import React from "react";

import { IonButton } from "@ionic/react";

import { ITicketCount } from "../../../providers/tickets-devolution/tickets-devolution.types";

import "./ticket-count-item.style.scss";

type Props = {
  ticketCountObj: ITicketCount;
  fractionsCount: number;
  onCounterRevisar: (counterNumber: number) => void;
  onCounterReiniciar: (counterNumber: number) => void;
};

const TicketCountItem: React.FC<Props> = ({
  ticketCountObj,
  fractionsCount,
  onCounterRevisar,
  onCounterReiniciar,
}) => {
  const ticketsCount = ticketCountObj.tickets.length;
  const nroFraction = ticketCountObj.codigo;
  const cssClassNameByCodigo = `ticket-count-item__frac-nro tolis ticket-count-item__frac--${nroFraction}`;

  return (
    <div className="ticket-count-item">
      <div className="ticket-count-item__frac">
        <div className={cssClassNameByCodigo}></div>
        <span className="ticket-count-item__badge">{ticketsCount}</span>
        <div className="ticket-count-item__frac-txt"></div>
      </div>
      <div className="ticket-count-item__data">
        {fractionsCount > 0 ? (
          <div className="ticket-count-item__lbl">
            <div>
              <span className="azn-bolder-1">{ticketsCount}</span>
              &nbsp;lecturas
            </div>
            <span>-</span>
            <div>
              <span className="azn-bolder-1">{fractionsCount}</span>
              &nbsp;fracciones
            </div>
          </div>
        ) : (
          <div className="ticket-count-item__lbl">
            <span>Sin lectura</span>
          </div>
        )}
        <div className="ticket-count-item__actions">
          <IonButton
            color="secondary"
            size="small"
            className="azn-button-capitalize ticket-count-item__btn"
            disabled={fractionsCount === 0}
            onClick={() => {
              onCounterRevisar(ticketCountObj.codigo);
            }}
          >
            Revisar
          </IonButton>
          <IonButton
            color="secondary"
            size="small"
            className="azn-button-capitalize ticket-count-item__btn"
            style={{ color: "white" }}
            disabled={fractionsCount === 0}
            onClick={() => {
              onCounterReiniciar(ticketCountObj.codigo);
            }}
          >
            Reiniciar
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default TicketCountItem;
