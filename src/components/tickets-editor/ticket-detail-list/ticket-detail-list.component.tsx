import React, { useState, useEffect } from "react";

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

import "./ticket-detail-list.style.scss";
import { ITicket } from "../../../providers/tickets-devolution/tickets-devolution.types";
import TicketDetail from "../ticket-detail/ticket-detail.component";
import EditTicket from "../edit-ticket/edit-ticket.component";
import { useTicketDevolutionState } from "../../../providers/tickets-devolution/tickets-devolution.hook";
import Tip from "../../../shared/components/tip/tip.component";

interface IProps {
  ticketList: ITicket[];
}

const TicketDetailList: React.FC<IProps> = (props) => {
  const { ticketsCollection } = useTicketDevolutionState();
  const { ticketList } = props;
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  const virtualizedCache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  useEffect(() => {
    if (selectedTicket) {
      setSelectedTicket(ticketsCollection.byId[selectedTicket.codigo]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketList]);

  return (
    <>
      <Tip>
        <span>Seleccione un número para modificarlo</span>
      </Tip>

      <div style={{ height: "100vh" }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={virtualizedCache.current.rowHeight}
              deferredMeasurementCache={virtualizedCache.current}
              rowCount={ticketList.length}
              rowRenderer={({ key, index, style, parent }) => {
                const ticket = ticketList[index];
                return (
                  <CellMeasurer
                    key={key}
                    cache={virtualizedCache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      <div
                        className="ticket-detail-ticket"
                        key={ticket.codigo}
                        onClick={() => {
                          setSelectedTicket(ticket);
                        }}
                      >
                        <TicketDetail ticket={ticket} showRadio={true} />
                      </div>
                    </div>
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>

      {selectedTicket && (
        <EditTicket
          ticket={selectedTicket}
          onHide={(forceHide: boolean) => {
            if (forceHide) {
              setSelectedTicket(null);
            } else if (ticketsCollection.byId[selectedTicket.codigo]) {
              if (
                ticketList?.length > 0 &&
                ticketList[0].codigo ===
                  ticketsCollection.byId[selectedTicket.codigo].codigo
              ) {
                return;
              }
              setSelectedTicket(null);
            }
          }}
        />
      )}
    </>
  );
};

export default TicketDetailList;
