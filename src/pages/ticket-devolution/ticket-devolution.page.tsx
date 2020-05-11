import React from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useParams } from "react-router";

import LotteryTicketProvider from "../../providers/lottery-tickets/lottery-tickets.provider";
import TicketCountList from "../../components/ticket-count-list/ticket-count-list.component";

import "./ticket-devolution.style.scss";

const TicketDevolutionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="tertiary" />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <LotteryTicketProvider>
          <div className="ticket-devol-page">
            <TicketCountList></TicketCountList>
          </div>
        </LotteryTicketProvider>
      </IonContent>
    </IonPage>
  );
};

export default TicketDevolutionPage;
