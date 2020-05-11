import React from "react";

import { IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";

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
        
        {state.ticketsCollection.allIds.length === 0 && (
          <div className="warning_message">
            <IonIcon
              className="warning_message__icon"
              slot="start"
              icon={warningOutline}
            />
            <span className="warning_message__text">
              Aún no hay billetes escaneados
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketCountList;
