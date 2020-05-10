import React, { useState } from "react";

import { useLotteryTickets } from "../../providers/lottery-tickets/lottery-tickets.hooks";

const TicketList: React.FC = () => {
  
  const [code, setCode] = useState("");

  const {state, addTicket} = useLotteryTickets();

  console.log("state in list component", state);

  return (
    <>
      <div>
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />

        <span>Cant: {state.ticketsCollection.allIds.length}</span>

        <input
          type="button"
          value="add btn"
          onClick={() => {
            addTicket(code);
            setCode("");
          }}
        />
      </div>
    </>
  );
};

export default TicketList;
