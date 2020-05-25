import React from "react";

import "./ticket-detail-list.style.scss";
import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import TicketDetail from "../ticket-detail/ticket-detail.component";

interface IProps {
  ticketList: ITicket[];
}

const TicketDetailList: React.FC<IProps> = (props) => {
  const { ticketList } = props;

  return (
    <>
      {ticketList.map((ticket) => (
        <TicketDetail key={ticket.codigo} ticket={ticket}></TicketDetail>
      ))}
    </>
  );
};

export default TicketDetailList;
