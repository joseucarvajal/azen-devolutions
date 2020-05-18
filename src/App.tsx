import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Menu from "./components/Menu";

import TicketDevolutionPage from "./pages/tickets-devolution/ticket-devolution.page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./App.scss";

import LongActionIndicatorProvider from "./providers/long-action-indicator/long-action-indicator.context";
import LongActionIndicator from "./components/long-action-indicator/long-action-indicator.component";

const App: React.FC = () => {
  return (
    <IonApp>
      <LongActionIndicatorProvider>        
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route
                  path="/ticket-devolution/:name"
                  component={TicketDevolutionPage}
                  exact
                />
                <Redirect from="/" to="/ticket-devolution/Devolución" exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
          <LongActionIndicator />
      </LongActionIndicatorProvider>
    </IonApp>
  );
};

export default App;
