import { useNavigate }  from 'react-router-dom';

import Header from "../../components/header";
import styles from './styles.module.css';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [start, setStart] = useState(JSON.parse(localStorage.getItem('start') as any));
  localStorage.setItem('start', start);

    return (
      <div className={styles.container}>
        <Header pageName='Home' status={start} goBack={false} />
        {start ? (
          <>
            <button onClick={()=> {
  
            }} className={styles.menu}>Relatório diário</button>
            <button className={styles.menu}>Adicionar vendas</button>
            <strong>Para encerrar espediente, basta precionar o botão a baixo.</strong>
          </>
        ): (
          <>
            <button onClick={()=> navigate('/schedula')} className={styles.menu}>Agenda</button>
            <button onClick={()=> navigate('/history')} className={styles.menu}>Histórico de vendas</button>
            <strong>Para inciar o espediente, basta apertar o botão a baixo.</strong>
          </>
        )}
        
        {start ? (
          <button style={{backgroundColor: 'var(--red-200)'}} onClick={()=> {
            setStart(false);
            }}>
              Finalizar
          </button>
        ):(
          <button onClick={()=> {
            navigate('/start');
            }}>Iniciar</button>
        )}       
      </div>
    );
};
  
export default Home;