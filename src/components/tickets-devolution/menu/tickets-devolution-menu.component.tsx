import React, { useState, SyntheticEvent, useEffect } from "react";

import "./tickets-devolution-menu.style.scss";

import {
  IonIcon,
  IonButton,
  IonPopover,
  IonItem,
  IonList,
  IonAvatar,
  IonLabel,
  IonToggle,
} from "@ionic/react";
import {
  pencilOutline,
  ellipsisVerticalOutline,
  barcodeOutline,
  shareSocialOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";

import { OptionMenu } from "../../../providers/tickets-devolution/tickets-devolution.types";
import { useTicketDevolutionReportState } from "../../../providers/tickets-devolution/tickets-devolution.report.hooks";
import {
  useTicketDevolutionState,
  useTicketDevolution,
} from "../../../providers/tickets-devolution/tickets-devolution.hook";
import { useAuthenticationState } from "../../../providers/authentication/authentication.hooks";

interface IMenuOption {
  icon: string;
  label: string;
  option: OptionMenu;
}

interface IProps {
  handleOptionClick: (optionMenu: OptionMenu) => void;
}

const TicketsDevolutionMenu: React.FC<IProps> = (props) => {

  const { userName: agente } = useAuthenticationState();

  const { leerXFracciones } = useTicketDevolutionState();
  const { setLeerXFracciones, shareDevolutionFileViaWhatsApp } = useTicketDevolution(agente);
  const ticketDevolutionCounterReport = useTicketDevolutionReportState();
  const [menuOptions, setMenuOptions] = useState<IMenuOption[]>([]);

  useEffect(() => {
    const menuOpts: IMenuOption[] = [
      {
        icon: pencilOutline,
        label: "Digitar código",
        option: "DIGITAR_CODIGO",
      },
      {
        icon: barcodeOutline,
        label: "",
        option: "TOGGLE_LECTURA_FRACCION",
      },
    ];

    if (ticketDevolutionCounterReport.ticketsTotalCount) {
      menuOpts.unshift(
        {
          icon: checkmarkCircleOutline,
          label: "Revisar numeración",
          option: "VER_NUMERACION",
        },
        {
          icon: shareSocialOutline,
          label: "Compartir lectura",
          option: "SHARE_READING_FILE",
        }
      );
    }

    setMenuOptions(menuOpts);
  }, [ticketDevolutionCounterReport]);

  const [showMenu, setShowMenu] = useState(false);
  const [evt, setEvt] = useState<any>();

  const { handleOptionClick } = props;

  const onShowMenuClick = (e: SyntheticEvent) => {
    e.persist();
    setShowMenu(true);
    setEvt(e);
  };

  const onOptionClick = (option: OptionMenu) => {
    if (option === "SHARE_READING_FILE") {
      shareDevolutionFileViaWhatsApp();
    } else {
      handleOptionClick(option);
    }

    setShowMenu(false);
  };

  return (
    <>
      <IonButton onClick={onShowMenuClick}>
        <IonIcon icon={ellipsisVerticalOutline} />
        <span className="pop-over-btn">Más Opciones</span>
      </IonButton>
      <IonPopover
        isOpen={showMenu}
        cssClass="pop_over"
        event={evt}
        onWillDismiss={() => {
          setShowMenu(false);
        }}
      >
        <IonList>
          {menuOptions.map((optionItem) =>
            optionItem.option === "TOGGLE_LECTURA_FRACCION" ? (
              <IonItem key={optionItem.option}>
                <IonToggle
                  mode="ios"
                  color="secondary"
                  checked={leerXFracciones}
                  onIonChange={(e) => setLeerXFracciones(e.detail.checked)}
                />
                <span
                  onClick={() => {
                    setLeerXFracciones(!leerXFracciones);
                  }}
                >
                  &nbsp;Lectura por fracciones
                </span>
              </IonItem>
            ) : (
              <IonItem
                key={optionItem.option}
                onClick={() => {
                  onOptionClick(optionItem.option);
                }}
              >
                <IonAvatar>
                  <div className="menu-item">
                    <div className="menu-item__icon">
                      <IonIcon icon={optionItem.icon} />
                    </div>
                  </div>
                </IonAvatar>
                <IonLabel>{optionItem.label}</IonLabel>
              </IonItem>
            )
          )}
        </IonList>
      </IonPopover>
    </>
  );
};

export default TicketsDevolutionMenu;
