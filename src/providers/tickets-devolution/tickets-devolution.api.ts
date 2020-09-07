import { IDevolutionEntity } from "./tickets-devolution.types";
import { trimLasCharacter } from "../../shared/utils/zutils";
import { IAzenErrorInfo } from "../../shared/contracts/shared.contracts";

export const saveTicketDevolutionEntity = async (
    devolutionEntity: IDevolutionEntity,
    apiURL: string,
    tkns:string
) => {
  try {
    const response = await fetch(
      `${trimLasCharacter(apiURL, "/")}/api/service/azenltr_dev/ltrdeven_CargarDevolucionAgente`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tkns}`
        },
        method: "POST",
        body: JSON.stringify(devolutionEntity),
      }
    );

    if (response.status !== 200) {

      const errorInfo = (await response.json()) as IAzenErrorInfo;
      if(errorInfo){
          throw new Error(errorInfo.Title);
      }

      throw new Error("Por favor verifique la dirección del servicio");
    }        
  } catch (err) {
    throw err;
  }
};
