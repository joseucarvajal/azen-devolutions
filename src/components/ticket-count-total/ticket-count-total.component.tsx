import React, { useContext, useMemo } from "react";

import './ticket-count-total.style.scss';

import { LotteryTicketsContext } from "../../providers/lottery-tickets/lottery-tickets.provider";


const TicketCountTotal = () => {
  const { ticketCounterReport } = useContext(LotteryTicketsContext);

  return useMemo(() => {
    return (
      <div className="tickets-count-total">
        <div className="ticket-count__frac">
          <span>Conteo fracciones:</span>
          <span className="tickets-count-total__vlr">
            {ticketCounterReport ? ticketCounterReport.fractionsTotalCount : 0}
          </span>
        </div>
        <div className="ticket-count__ticket">
          <span>Conteo billetes:</span>
          <span className="tickets-count-total__vlr">
            {ticketCounterReport ? ticketCounterReport.ticketsTotalCount : 0}
          </span>
        </div>
      </div>
    );
  }, [ticketCounterReport]);
};

export default TicketCountTotal;
