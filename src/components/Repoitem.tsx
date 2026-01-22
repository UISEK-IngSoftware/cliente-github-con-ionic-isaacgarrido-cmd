import { IonItem, IonLabel, IonThumbnail, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { trash, create } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Repoitem.css';
import { RepositoryItem } from '../interfaces/Repositoryitem';

interface RepoitemProps {
  repo: RepositoryItem;
  onDelete: (repo: RepositoryItem) => void;
}

const Repoitem: React.FC<RepoitemProps> = ({ repo, onDelete }) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push('/tab2', { repo });
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot='start'>
          <img src={repo.imageUrl || ''} alt={repo.name} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          {repo.description && <p>{repo.description}</p>}
          {repo.owner && <p><strong>Owner: </strong>{repo.owner}</p>}
          {repo.language && <p><strong>Language: </strong>{repo.language}</p>}
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={handleEdit}>
          <IonIcon slot="icon-only" icon={create}></IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => onDelete(repo)}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default Repoitem;
