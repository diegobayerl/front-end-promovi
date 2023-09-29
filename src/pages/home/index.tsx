import { useNavigate }  from 'react-router-dom';

import Header from "../../components/header";
import styles from './styles.module.css';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [teste, setTeste] = useState(JSON.parse(localStorage.getItem('teste') as any));
  localStorage.setItem('teste', teste);

    return (
      <div className={styles.container}>
        <Header pageName='Home' status={teste} goBack={false} />
        <button onClick={()=> navigate('/schedula')} className={styles.menu}>Agenda</button>
        <button onClick={()=> navigate('/history')} className={styles.menu}>Histórico de vendas</button>
        <strong>Para inciar o espediente, basta apertar o botão a baixo.</strong>
        
        {teste ? (
          <button style={{backgroundColor: 'var(--red-200)'}} onClick={()=> {
            setTeste(false);
            }}>
              Finalizar
          </button>
        ):(
          <button onClick={()=> {
            setTeste(true);
            navigate('/start');
            }}>Iniciar</button>
        )}       
      </div>
    );
};
  
export default Home;