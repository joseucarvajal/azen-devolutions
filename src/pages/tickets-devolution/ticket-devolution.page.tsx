import React from "react";

import "./ticket-devolution.style.scss";

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

import TicketDevolutionProvider from "../../providers/tickets-devolution/tickets-devolution.provider";

import TicketDevolutionMain from "../../components/tickets-devolution/ticket-devolution-main/ticket-devolution-main.component";

const TicketDevolutionPage: React.FC = () => {

  const { name } = useParams<{ name: string }>();

  return (
    <TicketDevolutionProvider>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton color="primary" />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TicketDevolutionMain/>
        </IonContent>
      </IonPage>
    </TicketDevolutionProvider>
  );
};

export default TicketDevolutionPage;
