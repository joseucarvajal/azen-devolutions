import React from "react";

import "./long-action-indicator.styles.scss";

import { IonLoading, IonToast } from "@ionic/react";
import {
  useLongActionIndicator,
} from "../../providers/long-action-indicator/long-action-indicator.hooks";
import { HIDE_MESSAGE } from "../../providers/long-action-indicator/long-action-indicator.types";

const LongActionIndicator: React.FC = () => {
  const {
    useContext: {
      state: {
        isLoading,
        resultMessage,
        status,
        loadingMessage,
        messagePosition,
      },
    },
    useDispatch: { dispatch },
  } = useLongActionIndicator();

  const hideToast = () => {
    dispatch({
      type: HIDE_MESSAGE,
    });
  };

  return (
    <>
      <IonLoading isOpen={isLoading} message={loadingMessage} spinner="lines" />

      <IonToast
        isOpen={resultMessage.length > 0}
        message={status === "error" ? `ERROR: ${resultMessage}` : resultMessage}
        duration={2000}
        position={messagePosition}
        color={status === "error" ? "danger" : "success"}
        onDidDismiss={hideToast}
      />
    </>
  );
};

export default LongActionIndicator;
