import React, { useState } from "react";

import { useLotteryTickets } from "../../providers/lottery-tickets/lottery-tickets.hooks";

const TicketList: React.FC = () => {
  const [code, setCode] = useState("");

  const { state, addTicket, fraccionesCount } = useLotteryTickets();

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

        <br />
        <br />
        {fraccionesCount.map((val, i) => (
          <div key={i}>
            <div>
              Fraccion [{i + 1}]: {val}
            </div>
          </div>
        ))}
        <br />

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
