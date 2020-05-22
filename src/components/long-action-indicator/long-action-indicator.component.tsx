import React from "react";

import "./long-action-indicator.styles.scss";

import { IonLoading, IonToast } from "@ionic/react";

import { useLongActionIndicator } from "../../providers/long-action-indicator/long-action-indicator.hooks";

const LongActionIndicator: React.FC = () => {
  const {
    state: {
      isLoading,
      loadingMessage,
      resultMessage,
      status,
      messagePosition,
    },
    actions:{
      hideMessage
    }
  } = useLongActionIndicator();

  return (
    <>
      <IonLoading isOpen={isLoading} message={loadingMessage} spinner="lines" />

      <IonToast
        isOpen={resultMessage.length > 0}
        message={status === "error" ? `ERROR: ${resultMessage}` : resultMessage}
        duration={5000}
        position={messagePosition}
        color={status === "error" ? "danger" : "success"}
        onDidDismiss={hideMessage}
      />
    </>
  );
};

export default LongActionIndicator;
