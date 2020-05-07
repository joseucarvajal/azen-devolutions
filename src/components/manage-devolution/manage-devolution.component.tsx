import React, { useContext } from "react";
import "./manage-devolution.style.scss";

import { addLotteryTicket } from "../../providers/lottery-tickets/lottery-tickets.actions";

import LotteryTicketProvider, {
  LotteryTicketsContext,
} from "../../providers/lottery-tickets/lottery-tickets.provider";

import TicketList from "../ticket-list/ticket-list.component";
import { ITicket } from "../../providers/lottery-tickets/lottery-tickets.contracts";

const ManageDevolution: React.FC = () => {
  const { dispatch } = useContext(LotteryTicketsContext);

  return (
    <LotteryTicketProvider>
      <div>
        <TicketList></TicketList>
        <div>
          <input type="text" placeholder="code" id="barcode" /> <br/>
          <input type="text" placeholder="fraction" id="fraction" /> <br/>
          <input
            type="button"
            value="add"
            onClick={() => {
                const input = document.getElementById("barcode") as HTMLInputElement;
                const fraction = document.getElementById("fraction") as HTMLInputElement;
              dispatch(
                addLotteryTicket({
                  codigo: input?.value,
                  fraccion: fraction?.value,
                  numero: input.value + "02",
                } as ITicket)
              );
            }}
          />
        </div>
      </div>
    </LotteryTicketProvider>
  );
};

export default ManageDevolution;
