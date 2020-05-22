import React from "react";
import { IonApp } from "@ionic/react";

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

import AuthenticationProvider from "./providers/authentication/authentication.context";
import SafeZone from "./SafeZone";
import LongActionIndicator from "./components/long-action-indicator/long-action-indicator.component";

const App: React.FC = () => {
  return (
    <IonApp>
      <LongActionIndicatorProvider>
        <AuthenticationProvider>
          <SafeZone />
          <LongActionIndicator />
        </AuthenticationProvider>
      </LongActionIndicatorProvider>
    </IonApp>
  );
};

export default App;
