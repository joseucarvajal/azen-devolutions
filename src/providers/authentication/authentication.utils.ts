import { IAuthenticationState } from "./authentication-types";

export const authenticateUser = async (authenticationData: IAuthenticationState) => {
    try {
        const response = await fetch(`http://52.42.49.101:8080/azen/Sesion?cmd=-3&buffer=<cm>LOGIN</cm><usr>${authenticationData.userName}</usr><vc>${authenticationData.password}</vc>&idApl=null&dominio=*`);
        const responseText: string = await response.text();
        alert(responseText);
    }
    catch (err) {
        throw err;
    }
}