import React, { useContext } from "react";

import "./long-action-indicator.styles.scss";

import { IonLoading, IonToast } from "@ionic/react";
import { LongActionIndicatorContext } from "../../providers/long-action-indicator/long-action-indicator.provider";
import { IActionResultEnum } from "../../providers/long-action-indicator/long-action-indicator.contracts";

const LongActionIndicator = () => {
  const { state } = useContext(LongActionIndicatorContext);

  return (
    <>
      <IonLoading
        isOpen={state.isLoading}
        message={state.loadingMessage}
        spinner="lines"
      />

      <IonToast
        isOpen={state.resultMessage ? true : false}
        message={
          state.status === IActionResultEnum.ERROR
            ? `ERROR: ${state.resultMessage}`
            : state.resultMessage
        }
        duration={5000}
        position="bottom"
        color={state.status === IActionResultEnum.ERROR ? "danger" : "success"}
      />
    </>
  );
};

export default LongActionIndicator;
