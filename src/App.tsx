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

/**Custom scss */

import LongActionIndicatorProvider from "./providers/long-action-indicator/long-action-indicator.context";

import AuthenticationProvider from "./providers/authentication/authentication.context";
import SafeZone from "./SafeZone";
import LongActionIndicator from "./components/long-action-indicator/long-action-indicator.component";
import GlobalSetupProvider from "./providers/global-setup/global-setup.context";

declare var navigator:any;

const App: React.FC = () => {

  document.addEventListener('ionBackButton', (ev:any) => {
    ev.detail.register(10, () => {
      // eslint-disable-next-line no-restricted-globals
      const res = confirm('¿Desea salir de la aplicación?');
      if(res){
        navigator['app'].exitApp();
      }
    });
  });

  return (
    <IonApp>
      <GlobalSetupProvider>
        <LongActionIndicatorProvider>
          <AuthenticationProvider>
            <SafeZone />
            <LongActionIndicator />
          </AuthenticationProvider>
        </LongActionIndicatorProvider>
      </GlobalSetupProvider>
    </IonApp>
  );
};

export default App;
