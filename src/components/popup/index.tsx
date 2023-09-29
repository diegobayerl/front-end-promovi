import { useState } from 'react';
import Modal from 'react-modal';
interface Schedula {
    name: string;
    agenda: {
        name: string;
        idade: number;
    };
}

Modal.setAppElement('#root');

function PopUp({name, agenda}: Schedula){
    const [popup, setPopup] = useState(false);
    
    return (
        <div>
            <button onClick={()=> setPopup(true)}>Detalhes</button>
            <Modal
                isOpen={popup}
                onRequestClose={()=> setPopup(false)}
                contentLabel="Exemplo de Popup"
            >
                <h2>{agenda.name}</h2>
                <p>{agenda.idade}</p>
                <button onClick={()=> setPopup(false)}>Fechar Popup</button>
            </Modal>
        </div>
    );
}

export default PopUp;