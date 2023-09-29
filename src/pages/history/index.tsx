import Header from '../../components/header';
import styles from './styles.module.css';

function History(){
    const start = JSON.parse(localStorage.getItem('start') as any);

    return (
        <div className={styles.container}>
            <Header status={start} pageName='Histórico' goBack={true}/>
        </div>
    );

}

export default History;