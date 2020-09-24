import { IDevolutionEntity } from "./tickets-devolution.types";
import { trimLasCharacter } from "../../shared/utils/zutils";
import { IAzenErrorInfo, ZServiceResponse } from "../../shared/contracts/shared.contracts";

export const saveTicketDevolutionEntity = async (
    devolutionEntity: IDevolutionEntity,
    apiURL: string,
    tkns:string
):  Promise<ZServiceResponse> => {
  try {

    let devEntity = devolutionEntity as any;
    let query = Object.keys(devolutionEntity)
    .map(k =>  `${encodeURIComponent(k)}=${encodeURIComponent(devEntity[k])}`)
    .join('&');

    const response = await fetch(
      `${trimLasCharacter(apiURL, "/")}/api/service/azenltr_dev/ltrdeven_CargarDevolucionAgente?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tkns}`
        },
        method: "GET"
      }
    );

    if (response.status !== 200) {

      const errorInfo = await response.json() as IAzenErrorInfo;
      if(errorInfo){
        throw new Error(errorInfo.Title);
      }
      
      throw new Error("Por favor verifique la dirección del servicio");
    }
    
    const responseStr = await response.text();    
    const zresponse = JSON.parse(responseStr) as ZServiceResponse;

    return zresponse;
    
  } catch (err) {
    throw err;
  }
};
