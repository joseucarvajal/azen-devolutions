import React from "react";

import "./info-sorteo.scss";

import EmptyResultMsgComponent from "../empty-results-msg/empty-results-msg.component";
import { useTicketDevolutionState } from "../../../providers/tickets-devolution/tickets-devolution.hook";
import { useAuthenticationState } from "../../../providers/authentication/authentication.hooks";

const TicketCountList: React.FC = () => {
  const { userName: agente } = useAuthenticationState();
  const { sorteo, leerXFracciones } = useTicketDevolutionState();

  return (
    <>
      <div className="info-sorteo">
        <div className="info-sorteo__header">Información sorteo</div>
        {sorteo ? (
          <div className="info-sorteo__info">
            <div className="info-sorteo__info-row">
              <span className="info-sorteo__info-lbl">Agente</span>
              <span className="info-sorteo__info-vlr">{agente} - Lectura por <b><u>{leerXFracciones ? 'Fracciones' : 'Billetes'}</u></b></span>
            </div>
            <div className="info-sorteo__info-row">
              <span className="info-sorteo__info-lbl">Sorteo</span>
              <span className="info-sorteo__info-vlr">{sorteo}</span>
            </div>
          </div>
        ) : (
          <div className="info-sorteo__info-row info-sorteo__no-lectura">
            <EmptyResultMsgComponent />
          </div>
        )}
      </div>
    </>
  );
};

export default TicketCountList;
