import { useEffect, useState } from 'react';
import Header from '../../components/header';
import PopUp from '../../components/popup';
import styles from './styles.module.css';
import { api } from '../../services/api';
import Schedula from '../types/schedula';
import { useNavigate } from 'react-router-dom';

function Schedulas(){
    const start = JSON.parse(localStorage.getItem('start') as any);

    const [schedula, setSchedula] = useState<Schedula[]>([]);

    const id = localStorage.getItem('auth.user_id')

    const navigate = useNavigate();
    
    function getDateForWeek(date: Date){
        const dayWeek = date.getDay();

        date.setDate(date.getDate() - (dayWeek + 6)%7)

        const dates = [];

        for (let i = 0; i < 5; i++){
            const currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + i);
            dates.push(currentDate);
        }

        return dates;
    }

    useEffect(() => {
        const now = new Date();
        const dates = getDateForWeek(now);
        api.get(`/user/schedula/date?one=${dates[0]}&two=${dates[4]}&id=${id}`).then(response => {
            setSchedula(response.data);
        })
    }, []);

    function DateFormat(date: string){
        const data = new Date(date);
        const ano = data.getFullYear();
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const dia = data.getDate().toString().padStart(2, '0');

        const newDate = `${dia}/${mes}/${ano}`;

        return newDate;
    }

    return (
        <div className={styles.container}>
            <Header status={start} pageName='Agenda' goBack={true}/>
            
            <div className={styles.boxCard}>
                {schedula.map( item => {
                    return(
                        <div key={item.id} className={styles.card}>
                        {item.status ? (
                            <div style={{backgroundColor: 'var(--green-200)'}}>
                                <label>{item.name}</label>
                            </div>
                        ):(
                            <div>
                                <label>{item.name}</label>
                            </div>
                        )}
                        <div>
                            <strong>{DateFormat(item.date)}</strong>
                            <label>{item.status ? ('Concluido'): ('Pendente')}</label>
                            <PopUp item={item}/>
                        </div>
                    </div>
                    )  
                })}
                <button onClick={() => navigate('/schedula/create')} className={styles.buttonCreate}>Nova tarefa</button>     
            </div>
        </div>
    );

}

export default Schedulas;