import React from "react";

import "./ticket-detail.style.scss";
import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import { IonRadio } from "@ionic/react";
import NumberWord from "../number-word/number-word.component";

interface IProps {
  ticket: ITicket;
}

const TicketDetail: React.FC<IProps> = (props) => {
  const { ticket } = props;

  return (
    <div className="ticket-detail">
      <div className="ticket-detail__radio">
        <IonRadio />
      </div>
      <div className="ticket-detail__serie"><NumberWord number={ticket.serie}/></div>
      <div className="ticket-detail__numero"><span style={{fontSize:'3rem'}}>{ticket.numero}</span></div>
      <div className="ticket-detail__fraccion">
        <span className="ticket-fraccion__frac">{ticket.fraccion}</span>
        <hr/>
        <span className="ticket-fraccion__cant">{ticket.cantidadFracciones}</span>
      </div>
    </div>
  );
};

export default TicketDetail;
