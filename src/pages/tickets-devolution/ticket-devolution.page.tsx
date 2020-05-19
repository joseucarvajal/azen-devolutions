import React from "react";

import "./ticket-devolution.style.scss";

import TicketDevolutionProvider from "../../providers/tickets-devolution/tickets-devolution.context";

import TicketDevolutionMain from "../../components/tickets-devolution/ticket-devolution-main/ticket-devolution-main.component";

const TicketDevolutionPage: React.FC = () => {  
  return (
    <TicketDevolutionProvider>
      <TicketDevolutionMain />
    </TicketDevolutionProvider>
  );
};

export default TicketDevolutionPage;
