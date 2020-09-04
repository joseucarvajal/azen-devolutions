import { ISetAuthenticationValues } from "./authentication-types";
import { IAzenErrorInfo } from "../../shared/contracts/shared.contracts";
import { trimLasCharacter } from '../../shared/utils/zutils';

import { getCipherText } from '../../shared/encryption/zcriptography';

/**
 * @param authenticationData Authentication user data.
 * @param apiURL base API URI
 */
export const authenticateUser = async (
  authenticationData: ISetAuthenticationValues,
  apiURL: string
) => {
  try {
    const response = await fetch(`${trimLasCharacter(apiURL, '/')}/api/service/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
          userName: getCipherText(authenticationData.userName),
          password: getCipherText(authenticationData.password),
      }),
    });

    if(response.status === 401){
        const errorInfo = await response.json() as IAzenErrorInfo;
        throw new Error(errorInfo.Title);
    }

    return await response.text();

  } catch (err) {
    throw err;
  }
};
