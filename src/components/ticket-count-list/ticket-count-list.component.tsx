import React from "react";

import { useLotteryTickets } from "../../providers/lottery-tickets/lottery-tickets.hooks";

import TicketCountItem from "../ticket-count-item/ticket-count-item.component";

import "./ticket-count-list.style.scss";

const TicketCountList: React.FC = () => {
  const { state } = useLotteryTickets();

  let currentTicketCounter;

  return (
    <>
      <div className="ticket-count-list">
        {state.ticketsCounterCollection.allIds.map((counterCodigo) => {
          currentTicketCounter =
            state.ticketsCounterCollection.byId[counterCodigo];
          console.log("obj", currentTicketCounter);
          return (
            <TicketCountItem
              key={counterCodigo}
              ticketCountObj={currentTicketCounter}
            />
          );
        })}               
      </div>
    </>
  );
};

export default TicketCountList;
