import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import './Tab1.css';
import Repoitem from '../components/Repoitem';
import { fetchRepositories } from '../services/GithubService';
import { RepositoryItem } from '../interfaces/Repositoryitem';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);

  useEffect(() => {
    const loadRepos = async () => {
      const fetchedRepos = await fetchRepositories();
      setRepos(fetchedRepos);
    };
    loadRepos();
  }, []);

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
          {repos.map((repo, index) => (
            <Repoitem key={index} repo={repo} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
