import React, { useContext, useMemo } from "react";

import TicketCountItem from "../ticket-count-item/ticket-count-item.component";

import "./ticket-count-list.style.scss";
import { TicketsDevolutionContext } from "../../../providers/tickets-devolution/tickets-devolution.provider";

const TicketCountList: React.FC = () => {
  const { state, ticketDevolutionCounterReport: ticketCounterReport } = useContext(TicketsDevolutionContext);

  return useMemo(() => {
    return (
      <div className="ticket-count-list">
        {state.ticketsCounterCollection.allIds.map((counterCodigo) => {
          const currentTicketCounter =
            state.ticketsCounterCollection.byId[counterCodigo];

          const totalFracciones =
            ticketCounterReport?.totalFractionsIndxByFraction?.length > 0
              ? ticketCounterReport?.totalFractionsIndxByFraction[
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
  }, [ticketCounterReport]);
};

export default TicketCountList;
