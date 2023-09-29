import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { useEffect, useState } from 'react';

function Start(){
    const navigate = useNavigate();

    const [lat, setLat] = useState<number>();
    const [lon, setLon] = useState<number>();

    const [selecao, setSelecao] = useState('');
    
    function Start(){
        localStorage.setItem('start', true as any);
        navigate('/home')
    }

    useEffect(() => {
        // Verifique se o navegador suporta geolocalização.
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

    const handleSelecaoChange = (event:any) => {
      setSelecao(event.target.value); };

    return(
        <div>
            <Header goBack={true} status={false} pageName='Iniciar Trabalho' />
            <label htmlFor="selecao">Selecione uma loja</label>
            <select id="selecao" value={selecao} onChange={(event) => handleSelecaoChange(event)}>
              <option value="promovi">Promovi</option>
              <option value="icast">ICast</option>
            </select>
            <strong>Cidade</strong>
            <strong>Bairro</strong>
            <strong>Atenção! Sua localização está sendo coletada junto ao início e termino do expediente</strong>
            <button onClick={Start}>{lat}</button>
        </div>
    );
}

export default Start;