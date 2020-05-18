import React, { useContext, useMemo } from "react";

import './ticket-count-total.style.scss';

import { TicketsDevolutionContext } from "../../../providers/tickets-devolution/tickets-devolution.provider";


const TicketCountTotal = () => {
  const { ticketDevolutionCounterReport: ticketCounterReport } = useContext(TicketsDevolutionContext);

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
