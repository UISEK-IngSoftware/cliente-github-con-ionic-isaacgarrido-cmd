import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./Tab3.css";
import { useState } from "react";
import { getUserInfo } from "../services/GithubService";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import { logOutOutline } from "ionicons/icons";

const Tab3: React.FC = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    name:'No se puede cargar el usuario',
    username: 'no-username',
    bio: 'No se puede cargar la biografía',
    avatar_url: 'https://ionicframework.com/docs/img/demos/card-media.png'
  });

  const handleLogout = () => {
    AuthService.logout();
    history.push('/login');
  };

  const loadUserInfo = async () => {
    const response = await getUserInfo();
    if (response) {
      setUserInfo({
        name: response. name,
        username: response. login,
        bio: response.bio,
        avatar_url: response. avatar_url,
      });
    }
  }
  
  useIonViewDidEnter(() => {
    loadUserInfo();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
           <img
             alt="Isaac Garrido"
             src={userInfo.avatar_url}
           />
           <IonCardHeader>
             <IonCardTitle>{userInfo.name}</IonCardTitle>
             <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
           </IonCardHeader>

           <IonCardContent>
             {userInfo.bio}
           </IonCardContent>
         </IonCard>
         <IonButton className="logout-button" expand="block" color="danger" onClick={handleLogout} >
          <IonIcon slot="start" icon={logOutOutline}/>
           Cerrar Sesión
         </IonButton>
       </IonContent>
    </IonPage>
  );
};

export default Tab3;
