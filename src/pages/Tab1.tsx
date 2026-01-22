import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonLoading, IonAlert, useIonViewDidEnter } from '@ionic/react';
import { useState } from 'react';

import './Tab1.css';
import Repoitem from '../components/Repoitem';
import { fetchRepositories, deleteRepository } from '../services/GithubService';
import { RepositoryItem } from '../interfaces/Repositoryitem';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<RepositoryItem | null>(null);

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRepos = await fetchRepositories();
      const savedRepo = localStorage.getItem('createdRepo');
      if (savedRepo) {
        const parsedRepo = JSON.parse(savedRepo);
        setRepos([parsedRepo, ...fetchedRepos]);
        localStorage.removeItem('createdRepo');
      } else {
        setRepos(fetchedRepos);
      }
    } catch (err) {
      setError('Error loading repositories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  const handleDelete = (repo: RepositoryItem) => {
    setRepoToDelete(repo);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (repoToDelete && repoToDelete.owner) {
      try {
        await deleteRepository(repoToDelete.owner, repoToDelete.name);
        setRepos(repos.filter(r => r.name !== repoToDelete.name));
      } catch (err) {
        setError('Error deleting repository');
        console.error(err);
      }
    }
    setShowDeleteAlert(false);
    setRepoToDelete(null);
  };

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
        <IonLoading isOpen={loading} message="Loading repositories..." />
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Confirm Delete"
          message={`Are you sure you want to delete ${repoToDelete?.name}?`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: confirmDelete,
            },
          ]}
        />
        {error && <p style={{ color: 'red', padding: '10px' }}>{error}</p>}
        <IonList>
          {repos.map((repo, index) => (
            <Repoitem key={index} repo={repo} onDelete={handleDelete} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
