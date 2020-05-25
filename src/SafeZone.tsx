import React from "react";
import { IonRouterOutlet, IonSplitPane, isPlatform } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Menu from "./components/Menu";

import TicketDevolutionPage from "./pages/tickets-devolution/ticket-devolution.page";
import AuthenticationPage from "./pages/authentication/authentication.page";
import { useAuthenticationState } from "./providers/authentication/authentication.hooks";

const SafeZone: React.FC = () => {

  const { user } = useAuthenticationState();

  return (
    <IonReactRouter>
      {user || isPlatform('mobileweb') ? (
        <>
          <Menu />
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <Route
                path="/ticket-devolution/:name"
                component={TicketDevolutionPage}
                exact
              />
              <Redirect
                from="/"
                to="/ticket-devolution/Devolución"
              />
            </IonRouterOutlet>
          </IonSplitPane>
        </>
      ) : (
        <IonRouterOutlet id="main">
          <Route path="/login/" component={AuthenticationPage} exact />
          <Redirect from="/" to="/login/" />
        </IonRouterOutlet>
      )}
    </IonReactRouter>
  );
};

export default SafeZone;
