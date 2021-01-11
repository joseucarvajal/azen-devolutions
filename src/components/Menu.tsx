import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonFooter,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import { arrowUndo } from "ionicons/icons";
import "./Menu.css";
import Footer from "../shared/components/footer/footer.component";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Devoluciones v.1.4",
    url: "/ticket-devolution/Inbox",
    iosIcon: arrowUndo,
    mdIcon: arrowUndo,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonListHeader>Opciones</IonListHeader>
          <IonNote>usuario: azen</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
