import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { useHistory, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { RepositoryItem } from "../interfaces/Repositoryitem";
import { createRepository, updateRepository } from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ repo?: RepositoryItem }>();
  const [repoFormData, setRepoFormData] = useState<RepositoryItem>({
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.repo) {
      setRepoFormData(location.state.repo);
      setIsEditing(true);
    }
  }, [location.state]);

  const setRepoName = (value: string) => {
    setRepoFormData(prev => ({ ...prev, name: value }));
  };

  const setDescription = (value: string) => {
    setRepoFormData(prev => ({ ...prev, description: value }));
  };

  const saveRepo = async () => {
    console.log('Guardando repositorio:', repoFormData);
    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio');
      return;
    }
    setLoading(true);
    try {
      if (isEditing && repoFormData.owner) {
        await updateRepository(repoFormData.owner, repoFormData.name, {
          name: repoFormData.name,
          description: repoFormData.description,
        });
      } else {
        const createdRepo = await createRepository(repoFormData);
        localStorage.setItem('createdRepo', JSON.stringify(createdRepo));
      }
      history.push('/tab1');
    } catch (error: unknown) {
      console.error('Error al guardar el repositorio: ', error);
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response: { data: { message: string } } };
        if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
          alert(`Error al guardar el repositorio: ${axiosError.response.data.message}`);
        } else {
          alert('Error al guardar el repositorio');
        }
      } else {
        alert('Error al guardar el repositorio');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? 'Editar repositorio' : 'Formulario de repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditing ? 'Editar repositorio' : 'Formulario de repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter text"
            value={repoFormData.name}
            onIonChange={e => setRepoName(e.detail.value!)}
            disabled={isEditing} // Can't change name when editing
          ></IonInput>

          <IonTextarea
            label="Descripcion del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Esto es un repositorio de ejemplo"
            value={repoFormData.description || ''}
            onIonChange={e => setDescription(e.detail.value!)}
            className="form-field"
            rows={6}
          ></IonTextarea>
          <IonButton expand="block" className="form-field" onClick={saveRepo}>
            {isEditing ? 'Actualizar' : 'Guardar'}
          </IonButton>
        </div>
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
