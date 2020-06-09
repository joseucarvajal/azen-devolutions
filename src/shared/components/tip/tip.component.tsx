import React from "react";

import "./tip.style.scss";
import { IonIcon } from "@ionic/react";
import { bulb, bulbSharp, bulbOutline } from "ionicons/icons";


const Tip: React.FC= ({ children }) => {
  return (
    <div className="tip">
      <span className="tip__icon"><IonIcon icon={bulbOutline} /></span> <b>Tip: </b> {children}
    </div>
  );
};

export default Tip;
