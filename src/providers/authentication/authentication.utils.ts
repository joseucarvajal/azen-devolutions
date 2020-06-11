import { ISetAuthenticationValues } from "./authentication-types";
import { isPlatform } from "@ionic/react";

export const authenticateUser = async (authenticationData: ISetAuthenticationValues, apiURL:string) => {
    try {

        if (isPlatform('mobileweb')) {
            return "asdf123";
        }

        const response = await fetch(`${apiURL}azen/Sesion?cmd=-3&buffer=<cm>LOGIN</cm><usr>${authenticationData.userName}</usr><vc>${authenticationData.password}</vc>&idApl=null&dominio=*`);
        const responseText: string = await response.text();

        const tknaStartIndx = responseText.indexOf('<tkna>');

        if (tknaStartIndx === -1) {
            const errorStartIndx = responseText.indexOf('<msj>');
            const errorEndIndx = responseText.indexOf('</msj>');
            throw new Error(responseText.substring(errorStartIndx, errorEndIndx));
        }

        const tknaEndIndx = responseText.indexOf('</tkna>');
        return responseText.substring(tknaStartIndx + '<tkna>'.length, tknaEndIndx);
    }
    catch (err) {
        throw err;
    }
}