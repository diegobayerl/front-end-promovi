import Header from '../../components/header';
import PopUp from '../../components/popup';
import styles from './styles.module.css';

function Schedula(){
    const start = JSON.parse(localStorage.getItem('start') as any);

    const agenda ={
        name: 'diego',
        idade: 21,
    }

    return (
        <div className={styles.container}>
            <Header status={start} pageName='Agenda' goBack={true}/>
            
            <div className={styles.boxCard}>
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <PopUp agenda={agenda} name={'promovi'}/>
                        <label>Pendente</label>
                    </div>
                </div>
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <PopUp agenda={agenda} name={'iCast'}/>
                        <label>Pendente</label>
                    </div>
                </div>
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div> 

                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>

                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>

                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>  
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>  
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>  
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>  
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>  
                <div className={styles.card}>
                    <div>
                        <label>Promovi</label>
                    </div>
                    <div>
                        <strong>25/08</strong>
                        <label>Pendente</label>
                    </div>
                </div>            
            </div>
        </div>
    );

}

export default Schedula;