import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { logoGithub } from "ionicons/icons";
import AuthService from "../services/AuthService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && token) {
      AuthService.setToken(token);
      AuthService.setUser({ login: username });
      history.push("/");
      window.location.reload(); // Force reload to update authentication state
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="login-container">
          <IonIcon icon={logoGithub} className="login-logo"></IonIcon>
          <h1>Iniciar sesión con GitHub</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <IonInput
              className="login-field"
              label="Usuario de Github"
              labelPlacement="floating"
              fill="outline"
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              required
            />
            <IonInput
              className="login-field"
              label="Token de acceso personal"
              labelPlacement="floating"
              fill="outline"
              type="password"
              value={token}
              onIonChange={(e) => setToken(e.detail.value!)}
              required
            />
            <IonButton expand="block" type="submit">
              Iniciar sesión
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;