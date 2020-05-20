import React from "react";

import { IonIcon } from "@ionic/react";
import { barcodeOutline } from "ionicons/icons";

import "./empty-results-msg.style.scss";

const EmptyResultMsgComponent: React.FC = () => {
  return (
    <div className="msg">
      Haga clic en{" "}
      <div className="msg__scan_icon-container">
        <span className="msg__scan-icon">
          <IonIcon icon={barcodeOutline} />
        </span>{" "}
      </div>
      para empezar la lectura
    </div>
  );
};

export default EmptyResultMsgComponent;
