import React, { SyntheticEvent, useState } from "react";

import "./ticket-search.style.scss";
import { IonInput, IonList, IonItem, IonButton, IonIcon } from "@ionic/react";
import { search, listCircleOutline } from "ionicons/icons";

interface IProps {
  onSearch: (searchValue: string | undefined) => void;
}
const TicketSearch: React.FC<IProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>();
  const [isShowingResult, setIsShowingResult] = useState<boolean>(false);

  const { onSearch } = props;

  const onSearchSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(isShowingResult){
      onSearch(undefined);
      setSearchValue('');
    }
    else {
      onSearch(searchValue);
    }

    setIsShowingResult(!isShowingResult);
  };

  return (
    <form onSubmit={onSearchSubmit}>
      <IonList>
        <IonItem>
          <IonInput
            placeholder="Buscar número"
            value={searchValue}
            onIonChange={(e: any) => {
              if (!e || e.detail?.value?.length === 0) {
                onSearch(undefined); //Bring all of the items
              }
              setIsShowingResult(false);
              setSearchValue(e.detail.value);
            }}
            required
          ></IonInput>
          <IonButton
            color="tertiary"
            type="submit"
            className="azn-button-capitalize"
          >
            {isShowingResult ? (
              <>
                <IonIcon icon={listCircleOutline} />
                Ver todos
              </>
            ) : (
              <>
                <IonIcon icon={search} />
                Buscar
              </>
            )}
          </IonButton>
        </IonItem>
      </IonList>
    </form>
  );
};

export default TicketSearch;
