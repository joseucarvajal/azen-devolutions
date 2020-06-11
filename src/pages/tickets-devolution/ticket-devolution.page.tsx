import React from "react";

import "./ticket-devolution.style.scss";

import TicketDevolutionProvider from "../../providers/tickets-devolution/tickets-devolution.context";

import TicketDevolutionMain from "../../components/tickets-devolution/main/ticket-devolution-main.component";
import TicketDevolutionReportProvider from "../../providers/tickets-devolution/tickets-devolution.report.context";

const TicketDevolutionPage: React.FC = () => {

  return (
    <TicketDevolutionProvider>
      <TicketDevolutionReportProvider>
        <TicketDevolutionMain />
      </TicketDevolutionReportProvider>
    </TicketDevolutionProvider>
  );
};

export default TicketDevolutionPage;
