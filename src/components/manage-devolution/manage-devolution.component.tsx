import React from "react";
import "./manage-devolution.style.scss";

import LotteryTicketProvider from "../../providers/lottery-tickets/lottery-tickets.provider";

import TicketList from "../ticket-list/ticket-list.component";

const ManageDevolution: React.FC = () => {  
  return (    
        <TicketList></TicketList>      
  );
};

export default ManageDevolution;
