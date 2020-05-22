import React, { useContext } from "react";

import TicketCountItem from "../ticket-count-item/ticket-count-item.component";

import "./ticket-count-list.style.scss";
import { TicketsDevolutionStateContext } from "../../../providers/tickets-devolution/tickets-devolution.context";
import { useTicketDevolutionReportState } from "../../../providers/tickets-devolution/tickets-devolution.report.hooks";

const TicketCountList: React.FC = () => {
  
  const { ticketsCounterCollection } = useContext(
    TicketsDevolutionStateContext
  );

  const ticketDevolutionCounterReport = useTicketDevolutionReportState();

  return (
    <div className="ticket-count-list">
      {ticketsCounterCollection.allIds.map((counterCodigo) => {
        const currentTicketCounter =
          ticketsCounterCollection.byId[counterCodigo];

        const totalFracciones =
          ticketDevolutionCounterReport?.totalFractionsIndxByFraction?.length >
          0
            ? ticketDevolutionCounterReport?.totalFractionsIndxByFraction[
                currentTicketCounter.codigo - 1
              ]
            : 0;

        return (
          <TicketCountItem
            key={counterCodigo}
            ticketCountObj={currentTicketCounter}
            fractionsCount={totalFracciones}
          />
        );
      })}
    </div>
  );
};

export default TicketCountList;
