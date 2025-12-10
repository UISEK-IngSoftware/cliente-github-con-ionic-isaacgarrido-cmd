import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import Repoitem from '../components/Repoitem';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <Repoitem name="Android-Repo" imageUrl="https://th.bing.com/th/id/R.df2e702629c1a73e440349c602142828?rik=9%2bJSqaOp7twffg&pid=ImgRaw&r=0" />
          <Repoitem name="Ionic-Repo" imageUrl="https://tse3.mm.bing.net/th/id/OIP.Zpp5c3n98ile9GPf_gU7MgHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" />
          <Repoitem name="Flutter-Repo" imageUrl="https://cdn.freelogovectors.net/wp-content/uploads/2023/09/flutter_logo-freelogovectors.net_.png" /> 
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
