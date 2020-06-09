import React from "react";

import "./info-sorteo.scss";

import EmptyResultMsgComponent from "../empty-results-msg/empty-results-msg.component";
import { useTicketDevolutionState } from "../../../providers/tickets-devolution/tickets-devolution.hook";

const TicketCountList: React.FC = () => {

  const { sorteo } = useTicketDevolutionState();

  return (
    <>
      <div className="info-sorteo">
        <div className="info-sorteo__header">Información sorteo</div>
        {sorteo ? (
          <div className="info-sorteo__info">
            <div className="info-sorteo__info-row">
              <span className="info-sorteo__info-lbl">Agente</span>
              <span className="info-sorteo__info-vlr">Azen</span>
            </div>
            <div className="info-sorteo__info-row">
              <span className="info-sorteo__info-lbl">Sorteo</span>
              <span className="info-sorteo__info-vlr">{sorteo}</span>
            </div>
          </div>
        ) : (
          <div className="info-sorteo__info-row info-sorteo__no-lectura">
            <EmptyResultMsgComponent/>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketCountList;
