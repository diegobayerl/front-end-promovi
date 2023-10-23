import { useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.css';

interface Schedula {
    item: {
        name: string;
        city: string;
        company_id: string;
        date: string;
        id: string;
        neighborhood: string;
        status: boolean;
    }
}

Modal.setAppElement('#root');

function DateFormat(date: string){
    const data = new Date(date);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');

    const newDate = `${dia}/${mes}/${ano}`;

    return newDate;
}

function PopUp({item}: Schedula){
    const [popup, setPopup] = useState(false);
  
    return (
        <>
            <button className={styles.details} onClick={()=> setPopup(true)}>mais detalhes</button>
            <Modal
                isOpen={popup}
                onRequestClose={()=> setPopup(false)}
                contentLabel="Exemplo de Popup"
            >
                <div className={styles.container}>
                    <button onClick={()=> setPopup(false)}>X</button>
                    <h2>{item.name}</h2>
                    
                    <p>Cidade: {item.city}</p>
                    <p>Bairro: {item.neighborhood}</p>
                    <p>Data: {DateFormat(item.date)}</p>
                    {item.status ? (
                        <p>Essa visita já foi realizada</p>
                    ): (
                        <p>Essa visita ainda não foi realizada</p>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default PopUp;