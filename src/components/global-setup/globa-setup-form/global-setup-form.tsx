import React, { useState } from "react";

import {
  IonButton,
  IonIcon,
  IonAlert,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { settingsSharp } from "ionicons/icons";
import { useGlobalSetup } from "../../../providers/global-setup/global-setup.hooks";

const GlobalSetupForm: React.FC = () => {
  const [{ apiBaseURL }, { setApiBaseURL }] = useGlobalSetup();

  const [showForm, setShowForm] = useState(false);

  const toogleShowForm = () => {
    setShowForm((showForm) => !showForm);
  };

  return (
    <>
      <IonFab
        vertical="top"
        horizontal="end"
        slot="fixed"
        onClick={toogleShowForm}
      >
        <IonFabButton>
          <IonIcon icon={settingsSharp} />
        </IonFabButton>
      </IonFab>

      <IonAlert
        isOpen={showForm}
        header={"Dirección servicios"}
        inputs={[
          {
            name: "apiURL",
            type: "text",
            value: apiBaseURL,
            placeholder: "Escriba la dirección aquí",
          },
        ]}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: toogleShowForm,
            cssClass: 'azn-label-btn'            
          },
          {
            text: "Guardar",
            role: "submit",
            handler: (formValues: any) => {
              if (formValues.apiURL.trim().length === 0) {
                alert("Por favor ingrese una dirección válida");
                return false;
              }
              setApiBaseURL(formValues.apiURL.trim());
              toogleShowForm();
            },
          },
        ]}
      />
    </>
  );
};

export default GlobalSetupForm;
