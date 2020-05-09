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
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import LotteryTicketProvider from "../providers/lottery-tickets/lottery-tickets.provider";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <LotteryTicketProvider>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name={name} />
        </IonContent>
      </IonPage>
    </LotteryTicketProvider>
  );
};

export default Page;
