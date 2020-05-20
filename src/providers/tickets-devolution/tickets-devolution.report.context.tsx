import * as React from "react";

import { createContext, useState, Dispatch, SetStateAction } from "react";

import { ITicketDevolutionReport } from "./tickets-devolution.types";

const initialContext = {
  agente: "",
  sorteo: "",
  ticketsTotalCount: 0,
  fractionsTotalCount: 0,
  totalFractionsIndxByFraction: [],
  totalTicketsIndxByFraction: [],
} as ITicketDevolutionReport;

export const TicketDevolutionReportStateContext = createContext(initialContext);

export const TicketDevolutionReportActionContext = createContext<
  Dispatch<SetStateAction<ITicketDevolutionReport>>
>(()=>{});

const TicketDevolutionReportProvider: React.FC = ({children}) => {
  const [ticketDevolutionReport, setTicketDevolutionReport] = useState(
    initialContext
  );

  return (
    <TicketDevolutionReportStateContext.Provider value={ticketDevolutionReport}>
      <TicketDevolutionReportActionContext.Provider value={setTicketDevolutionReport}>
        {children}
      </TicketDevolutionReportActionContext.Provider>
    </TicketDevolutionReportStateContext.Provider>
  );
};


export default TicketDevolutionReportProvider;


