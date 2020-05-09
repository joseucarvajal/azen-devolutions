import React, { useContext } from "react";

import { LotteryTicketsContext } from "../../providers/lottery-tickets/lottery-tickets.provider";

import { addLotteryTicket } from "../../providers/lottery-tickets/lottery-tickets.actions";

import { useTest } from "../../providers/lottery-tickets/lottery-tickets.provider";

const TicketList: React.FC = () => {
  const { state, dispatch } = useContext(LotteryTicketsContext);

  const [ addTicket ] = useTest();

  console.log("state in list component", state);  

  return (
    <>
      <div>
        <input
          type="button"
          value="add btn"
          onClick={() => {
            addTicket();
          }}
        />
      </div>
    </>
  );
};

export default TicketList;
