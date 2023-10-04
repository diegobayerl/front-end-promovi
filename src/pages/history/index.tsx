import { useEffect, useState } from 'react';
import Header from '../../components/header';
import styles from './styles.module.css';
import { api } from '../../services/api';
import Sale from '../types/sale';

function History(){
    const id = localStorage.getItem('auth.user_id');
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        api.get(`/sale/user/${id}`).then(response => {
            setSales(response.data);
        });
    }, []);
    
    return (
        <div className={styles.container}>
            <Header status={true} pageName='Histórico' goBack={true}/>
            {sales.map(item => {
                return (
                    <div key={item.id}>
                        <div>
                            <div>
                                <h1>{item.product.category}</h1>
                                <strong>{item.amount}</strong>
                            </div>
                            <strong>Description</strong>
                        </div>
                        <hr />
                    </div>
                );
            })}
        </div>
    );

}

export default History;