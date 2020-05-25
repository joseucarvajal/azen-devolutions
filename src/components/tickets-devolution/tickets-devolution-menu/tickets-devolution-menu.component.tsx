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
} from "@ionic/react";
import {
  pencilOutline,
  businessOutline,
  ellipsisVerticalOutline,
} from "ionicons/icons";

import { OptionMenu } from "../../../providers/tickets-devolution/tickets-devolution.types";
import { useTicketDevolutionReportState } from "../../../providers/tickets-devolution/tickets-devolution.report.hooks";

interface IMenuOption {
  icon: string;
  label: string;
  option: OptionMenu;
}

interface IProps {
  handleOptionClick: (optionMenu: OptionMenu) => void;
}

const TicketsDevolutionMenu: React.FC<IProps> = (props) => {

  const ticketDevolutionCounterReport = useTicketDevolutionReportState();
  const [menuOptions, setMenuOptions] = useState<IMenuOption[]>([]);

  useEffect(() => {

    const menuOpts: IMenuOption[] = [
      {
        icon: pencilOutline,
        label: "Digitar código",
        option: "DIGITAR_CODIGO",
      },
    ];

    if (ticketDevolutionCounterReport.ticketsTotalCount) {
      menuOpts.unshift({
        icon: businessOutline,
        label: "Listado billetes",
        option: "VER_NUMERACION",
      });
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
    handleOptionClick(option);
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
          {menuOptions.map((optionItem) => (
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
          ))}
        </IonList>
      </IonPopover>
    </>
  );
};

export default TicketsDevolutionMenu;
