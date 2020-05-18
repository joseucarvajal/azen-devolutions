import React, { useContext } from "react";

import "./long-action-indicator.styles.scss";

import { IonLoading, IonToast } from "@ionic/react";
import { IActionResultEnum } from "../../providers/long-action-indicator/long-action-indicator.types";
import { useLongActionIndicatorState } from "../../providers/long-action-indicator/long-action-indicator.hooks";

const LongActionIndicator = () => {
  const {
    state: { isLoading, resultMessage, status, loadingMessage },
  } = useLongActionIndicatorState();

  return (
    <>
      <IonLoading isOpen={isLoading} message={loadingMessage} spinner="lines" />

      <IonToast
        isOpen={resultMessage.length > 0}
        message={
          status === IActionResultEnum.ERROR
            ? `ERROR: ${resultMessage}`
            : resultMessage
        }
        duration={5000}
        position="bottom"
        color={status === IActionResultEnum.ERROR ? "danger" : "success"}
      />
    </>
  );
};

export default LongActionIndicator;
