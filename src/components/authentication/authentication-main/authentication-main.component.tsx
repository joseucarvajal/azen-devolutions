import React, { FormEvent } from "react";

import azenLogo from "../../../assets/img/azen-logo.jpg";

import "./authentication-main.style.scss";

import { IonContent, IonPage, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { personOutline, keyOutline } from "ionicons/icons";
import { useAuthentication } from "../../../providers/authentication/authentication.hooks";
import GlobalSetupForm from "../../global-setup/globa-setup-form/global-setup-form";

const AuthenticationMain: React.FC = () => {

  const [
    { userName, password },
    { setAuthenticationValues, authenticateUser }
  ] = useAuthentication();

  const onUserNameChange = (e: FormEvent<HTMLInputElement>) => {
    setAuthenticationValues({
      userName: e.currentTarget.value,
      password: password
    });
  };

  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setAuthenticationValues({
      userName: userName,
      password: e.currentTarget.value
    });    
  };

  const onAuthSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    authenticateUser({ userName, password });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <GlobalSetupForm/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="auth">
          <h1 className="azn-heading-1 auth__heading">Azen devoluciones</h1>

          <div className="auth__box">
            <div className="auth__box-header">Datos de ingreso</div>
            <form className="auth__box-form" onSubmit={onAuthSubmit}>
              <div className="auth__box-form-row">
                <span className="auth__box-form-icon">
                  <IonIcon icon={personOutline} />
                </span>
                <div className="auth__box-field">
                  <input
                    type="text"
                    className="auth__box-input"
                    placeholder="Usuario"
                    value={userName}
                    onChange={onUserNameChange}
                    required
                  />
                  <span className="auth__box-lbl">Usuario</span>
                </div>
              </div>
              <div className="auth__box-form-row">
                <span className="auth__box-form-icon">
                  <IonIcon icon={keyOutline} />
                </span>
                <div className="auth__box-field">
                  <input
                    type="password"
                    className="auth__box-input"
                    placeholder="Contraseña"
                    value={password}
                    onChange={onPasswordChange}
                    required
                  />
                  <span className="auth__box-lbl">Contraseña</span>
                </div>
              </div>
              <div className="auth__box-form-row auth__box-send-btn">
                <IonButton
                  color="secondary"
                  type="submit"
                  size="small"
                  className="azn-button-capitalize send-devolution__btn"
                >
                  Ingresar
                </IonButton>
              </div>
            </form>
          </div>

          <img
            src={azenLogo}
            alt="Logo Azen consultoría en sistemas"
            className="auth__logo"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthenticationMain;
