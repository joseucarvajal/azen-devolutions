import React from "react";

import "./ticket-detail.style.scss";
import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import NumberWord from "../number-word/number-word.component";

interface IProps {
  ticket: ITicket;
  showRadio?: boolean;
}

const TicketDetail: React.FC<IProps> = ({ ticket, showRadio }) => {
  return (
    <div className="ticket-detail">
      {showRadio && (
        <div className="ticket-detail__radio">
          <span className="ticket-detail__radio-circle"></span>
        </div>
      )}
      <div className="ticket-detail__serie">
      <span className="ticket-detail__serie-lbl">Serie</span>
        <NumberWord
          number={ticket.serie}
          digitValueStyle={{
            fontSize: "1.2rem",
          }}
        />
      </div>
      <div className="ticket-detail__numero">
        <span className="ticket-detail__numero-lbl">Número</span>
        <NumberWord
          number={ticket.numero}
          digitValueStyle={{
            fontSize: "1.6rem",
          }}
          digitStyle={{
            boxShadow: "none",
            background: "none",
          }}
          displayNumeroText={false}
        />
      </div>
      <div className="ticket-detail__fraccion">
        <div className="ticket-detail__fraccion-row">
          <span className="ticket-detail__fraccion-lbl">Fracción</span>
          <span className="ticket-detail__fraccion-vlr">{ticket.fraccion}</span>
        </div>
        <hr className="ticket-detail__fraccion-row__separator"></hr>
        <div className="ticket-detail__fraccion-row">
          <span className="ticket-detail__fraccion-lbl">Cantidad</span>
          <span className="ticket-detail__fraccion-vlr">
            {ticket.cantidadFracciones}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
