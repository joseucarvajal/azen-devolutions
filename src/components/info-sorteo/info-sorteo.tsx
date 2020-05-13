import React, { useContext, useMemo } from "react";

import "./info-sorteo.scss";

import { LotteryTicketsContext } from "../../providers/lottery-tickets/lottery-tickets.provider";

const TicketCountList: React.FC = () => {
  const { state } = useContext(LotteryTicketsContext);

  return useMemo(() => {
    return (
      <>
        <div className="info-sorteo">
          <div className="info-sorteo__header">Información sorteo</div>
          <div className="info-sorteo__info-row">
            <span className="info-sorteo__info-lbl">Agente</span>
            <span className="info-sorteo__info-vlr">xxxxx</span>
          </div>
          <div className="info-sorteo__info-row">
            <span className="info-sorteo__info-lbl">Sorteo</span>
            <span className="info-sorteo__info-vlr">{state.sorteo}</span>
          </div>
        </div>
      </>
    );
  }, [state.sorteo]);
};

export default TicketCountList;
