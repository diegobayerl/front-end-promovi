import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../services/api';

import styles from './styles.module.css';

interface Schedula {
  name: string;
  city: string;
  company_id: string;
  date: string;
  id: string;
  neighborhood: string;
  status: boolean;
  location_init: string;
}

function Finish(){
    const navigate = useNavigate();

    const [lat, setLat] = useState<number>();
    const [lon, setLon] = useState<number>();

    const [schedula, setSchedula] = useState<Schedula>();

    const id = localStorage.getItem("id.schedula");

    useEffect(() => {
      api.get(`/user/schedula/${id}`).then(response => {
          setSchedula(response.data);
      });
      
    }, []);

    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLat(position.coords.latitude);
              setLon(position.coords.longitude);
            },
            (error) => {
              console.log(error.message);
            }
          );
        } else {
          console.log('Geolocalização não suportada pelo navegador.');
        }
      }, []);

    async function handlesubmit(event: FormEvent){

      event.preventDefault();

      localStorage.setItem('start', false as any);

      await api.put(`/user/schedula/update/${id}`, {
        location_init: schedula?.location_init,
        location_end: `@${lat},${lon},16z`,
      });
      
      localStorage.removeItem('id.schedula');

      navigate('/home')
    }

    return(
        <div className={styles.container}>
            <Header goBack={true} status={true} pageName='Encerrar Trabalho' />
            <form onSubmit={handlesubmit}>
                <label htmlFor="selecao">Encerrar o espediente</label>
                
                <strong>Atenção! Sua localização está sendo coletada junto ao início e termino do expediente</strong>
                <div>
                  <button onSubmit={handlesubmit} type="submit">Encerrar</button>
                </div>
            </form>
        </div>
    );
}

export default Finish;