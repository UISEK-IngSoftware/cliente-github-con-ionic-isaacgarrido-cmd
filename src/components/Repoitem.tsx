import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './Repoitem.css';
import { RepositoryItem } from '../interfaces/Repositoryitem';

const Repoitem: React.FC<{ repo: RepositoryItem }> = ({ repo }) => {
  return (
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
  );
};

export default Repoitem;
