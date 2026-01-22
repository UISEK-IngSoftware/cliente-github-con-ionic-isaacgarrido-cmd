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
  IonLoading,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { logoGithub } from "ionicons/icons";
import AuthService from "../services/AuthService";
import { getUserInfo } from "../services/GithubService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && token) {
      setLoading(true);
      AuthService.setToken(token);
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          AuthService.setUser(userInfo);
          history.push("/");
        } else {
          alert("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Invalid token or network error");
      } finally {
        setLoading(false);
      }
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
        <IonLoading isOpen={loading} message="Logging in..." />
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