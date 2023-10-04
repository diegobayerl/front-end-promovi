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
                <h2>{item.name}</h2>
                <p>{item.city}</p>
                <button onClick={()=> setPopup(false)}>Fechar Popup</button>
            </Modal>
        </>
    );
}

export default PopUp;