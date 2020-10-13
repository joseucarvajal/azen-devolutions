import React from "react";

import "./ticket-count-total.style.scss";
import { useTicketDevolutionReportState } from "../../../providers/tickets-devolution/tickets-devolution.report.hooks";

const TicketCountTotal: React.FC = () => {

  const ticketDevolutionCounterReport = useTicketDevolutionReportState();

  return (
    <div className="tickets-count-total">
      <div className="ticket-count__frac">
        <span>Total lecturas:</span>
        <span className="tickets-count-total__vlr">
          {ticketDevolutionCounterReport
            ? ticketDevolutionCounterReport.ticketsTotalCount
            : 0}          
        </span>
      </div>
      <div className="ticket-count__ticket">
        <span>Total fracciones:</span>
        <span className="tickets-count-total__vlr">
          {ticketDevolutionCounterReport
            ? ticketDevolutionCounterReport.fractionsTotalCount
            : 0}            
        </span>
      </div>
    </div>
  );
};

export default TicketCountTotal;
