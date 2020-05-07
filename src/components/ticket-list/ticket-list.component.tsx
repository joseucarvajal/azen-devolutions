import React, { useContext } from "react";

import { LotteryTicketsContext } from "../../providers/lottery-tickets/lottery-tickets.provider";

const TicketList: React.FC = () => {

    const { state } = useContext(LotteryTicketsContext);
    
    console.log('debug: re-render - TicketList', state);    

    return <>
        <div>
            hello
        </div>
    </>;
};

export default TicketList;
