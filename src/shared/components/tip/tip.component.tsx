import React from "react";

import "./tip.style.scss";
import { IonIcon } from "@ionic/react";
import { bulbOutline } from "ionicons/icons";

const Tip: React.FC= ({ children }) => {
  return (
    <div className="tip">
      <span className="tip__icon"><IonIcon icon={bulbOutline} /></span> {children}
    </div>
  );
};

export default Tip;
