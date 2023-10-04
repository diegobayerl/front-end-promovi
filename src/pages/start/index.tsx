import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../services/api';

import styles from './styles.module.css';
import Schedula from '../types/schedula';

function Start(){
    const navigate = useNavigate();

    const [lat, setLat] = useState<number>();
    const [lon, setLon] = useState<number>();

    const [schedula, setSchedula] = useState<Schedula[]>([]);

    const [selecao, setSelecao] = useState('select');

    const id = localStorage.getItem("auth.user_id");

    useEffect(() => {
      api.get(`/user/schedulas/${id}`).then(response => {
          setSchedula(response.data);
      })
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

      localStorage.setItem('start', true as any);

      await api.put(`/user/schedula/update/${selecao}`, {
        location_init: `@${lat},${lon},16z`,
      });
      
      localStorage.setItem('id.schedula', selecao);
      navigate('/home')
    }

    return(
        <div className={styles.container}>
            <Header goBack={true} status={false} pageName='Iniciar Trabalho' />
            <form onSubmit={handlesubmit}>
                <label htmlFor="selecao">Selecione uma loja</label>
                
                <div>
                  <select id="selecao" value={selecao} onChange={(event) => setSelecao(event.target.value)}>
                    <option value="select">mais lojas...</option>
                    {schedula.map(response => {
                      if(!response.status)
                        return (
                            <option key={response.id} value={response.id}>{response.name}</option>
                        )
                    })}
                  </select>
                </div>

                <strong>{
                schedula.map(item => {
                  if(item.id === selecao){
                    return `Cidade: ${item.city}`
                  }})}
                </strong>
                <strong>{
                schedula.map(item => {
                  if(item.id === selecao){
                    return `Bairro: ${item.neighborhood}`
                  }})}</strong>

                <strong>Atenção! Sua localização está sendo coletada junto ao início e termino do expediente</strong>
                <div>
                  <button disabled={selecao === 'select'}type="submit">Iniciar</button>
                </div>
            </form>
        </div>
    );
}

export default Start;