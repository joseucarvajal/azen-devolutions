import * as React from "react";
import { useTicketEditor } from "../../../providers/tickets-editor/tickets-editor.hooks";
import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowBack, warning } from "ionicons/icons";

import "./tickets-editor-main.style.scss";

import TicketSearch from "../ticket-search/ticket-search.component";
import TicketDetailList from "../ticket-detail-list/ticket-detail-list.component";
import { useTicketDevolutionReportState } from "../../../providers/tickets-devolution/tickets-devolution.report.hooks";

interface IProps {
  hide: () => void;
  counterToEdit: number;
}

const TicketsEditorMain: React.FC<IProps> = ({ hide, counterToEdit }) => {

  const { ticketList, searchNumber, setSearchNumber } = useTicketEditor(
    counterToEdit
  );

  const {
    totalFractionsIndxByFraction,
    fractionsTotalCount,
  } = useTicketDevolutionReportState();

  return (
    <IonModal isOpen={true} onDidDismiss={hide}>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="end">
            <span className="ver-num__title">
              {counterToEdit
                ? `Billetes ${counterToEdit} fracciones`
                : "Listado numeración"}
            </span>
          </IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={hide}>
              <IonIcon icon={arrowBack} />
              Volver
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ticket-editor">
          {ticketList?.length > 0 ? (
            <>
              <TicketSearch onSearch={setSearchNumber} />
              <TicketDetailList ticketList={ticketList}></TicketDetailList>
            </>
          ) : (
            <div className="no-tickets">
              <div className="no-tickets-found">
                <span className="no-tickets-found__warn-icon">
                  <IonIcon icon={warning} />
                </span>
                <div>
                  <div className="no-tickets-found__section">
                    No se han encontrado billetes
                  </div>
                  {counterToEdit ? (
                    <div className="no-tickets-found__section">
                      Cantidad de fracciones:&nbsp;
                      <span className="no-tickets-found__nro">
                        {counterToEdit}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {searchNumber ? (
                    <div className="no-tickets-found__section">
                      Billete número :&nbsp;
                      <span className="no-tickets-found__nro">
                        {searchNumber}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <IonButton
                color="secondary"
                className="azn-button-capitalize"
                onClick={() => {
                  if (counterToEdit) {
                    if (
                      totalFractionsIndxByFraction &&
                      totalFractionsIndxByFraction[counterToEdit - 1]
                    ) {
                      setSearchNumber(undefined);
                    } else {
                      hide();
                    }
                  } else {
                    if (fractionsTotalCount) {
                      setSearchNumber(undefined);
                    } else {
                      hide();
                    }
                  }
                }}
              >
                <IonIcon icon={arrowBack} />
                Volver
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TicketsEditorMain;
