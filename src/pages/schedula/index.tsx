import { useEffect, useState } from 'react';
import Header from '../../components/header';
import PopUp from '../../components/popup';
import styles from './styles.module.css';
import { api } from '../../services/api';
import Schedula from '../types/schedula';

function Schedulas(){
    const start = JSON.parse(localStorage.getItem('start') as any);

    const [schedula, setSchedula] = useState<Schedula[]>([]);

    const id = localStorage.getItem('auth.user_id')

    useEffect(() => {
        api.get(`/user/schedulas/${id}`).then(response => {
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
            </div>
        </div>
    );

}

export default Schedulas;