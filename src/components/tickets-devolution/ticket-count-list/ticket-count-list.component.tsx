import React from "react";

import TicketCountItem from "../ticket-count-item/ticket-count-item.component";

import "./ticket-count-list.style.scss";
import { useTicketDevolutionReportState } from "../../../providers/tickets-devolution/tickets-devolution.report.hooks";
import { useTicketDevolutionState } from "../../../providers/tickets-devolution/tickets-devolution.hook";

interface IProps {
  onCounterRevisar: (counterNumber: number) => void;
  onCounterReiniciar: (counterNumber: number) => void;
}

const TicketCountList: React.FC<IProps> = ({
  onCounterRevisar,
  onCounterReiniciar,
}) => {
  const { ticketsCounterCollection } = useTicketDevolutionState();
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
          totalFracciones > 0 
          ?
          <TicketCountItem
            key={counterCodigo}
            ticketCountObj={currentTicketCounter}
            fractionsCount={totalFracciones}
            onCounterRevisar={onCounterRevisar}
            onCounterReiniciar={onCounterReiniciar}
          />
          : null
        );
      })}
    </div>
  );
};

export default TicketCountList;