import React, { SyntheticEvent, useState } from "react";

import "./ticket-search.style.scss";
import { IonInput, IonList, IonItem, IonButton, IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";

interface IProps {
  onSearch: (searchValue: string | undefined) => void;
}
const TicketSearch: React.FC<IProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>();

  const { onSearch } = props;

  const onSearchSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
      <form onSubmit={onSearchSubmit}>
        <IonList>
          <IonItem>
            <IonInput
              placeholder="Buscar número"
              value={searchValue}
              onIonChange={(e: any) => {
                if(e.detail.value.length === 0){                  
                  onSearch(undefined); //Bring all of the items
                }
                setSearchValue(e.detail.value);
              }}
              required
            ></IonInput>
            <IonButton
              color="secondary"
              type="submit"
              className="azn-button-capitalize"
              onClick={() => {}}
            >
              <IonIcon icon={search} />
              Buscar
            </IonButton>
          </IonItem>
        </IonList>
      </form>
  );
};

export default TicketSearch;
