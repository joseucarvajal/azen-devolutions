import React, { useState, useEffect } from "react";

import "./ticket-detail-list.style.scss";
import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import TicketDetail from "../ticket-detail/ticket-detail.component";
import EditTicket from "../edit-ticket/edit-ticket.component";
import { useTicketDevolutionState } from "../../../providers/tickets-devolution/tickets-devolution.hook";
import Tip from "../../../shared/components/tip/tip.component";

interface IProps {
  ticketList: ITicket[];
}

const TicketDetailList: React.FC<IProps> = (props) => {
  const { ticketList } = props;

  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  const { ticketsCollection } = useTicketDevolutionState();

  useEffect(() => {
    if (selectedTicket) {
      setSelectedTicket(ticketsCollection.byId[selectedTicket.codigo]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketList]);

  return (
    <>
      <Tip>
        <span>Seleccione un número para modificarlo</span>
      </Tip>

      {ticketList.map((ticket) => (
        <div
          className="ticket-detail-ticket"
          key={ticket.codigo}
          onClick={() => {
            setSelectedTicket(ticket);
          }}
        >
          <TicketDetail ticket={ticket} showRadio={true} />
        </div>
      ))}
      {selectedTicket && (
        <EditTicket
          ticket={selectedTicket}
          onHide={(forceHide:boolean) => {
            if(forceHide){
              setSelectedTicket(null);
            }
            else if (ticketsCollection.byId[selectedTicket.codigo]) {
              if(ticketList?.length > 0 && ticketList[0].codigo === ticketsCollection.byId[selectedTicket.codigo].codigo){
                return;
              }
              setSelectedTicket(null);
            }
          }}
        />
      )}
    </>
  );
};

export default TicketDetailList;
