import Header from '../../components/header';
import styles from './styles.module.css';

function History(){

    return (
        <div className={styles.container}>
            <Header pageName='Histórico' goBack={true}/>
        </div>
    );

}

export default History;