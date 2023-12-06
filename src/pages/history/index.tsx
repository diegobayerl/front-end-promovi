import { useEffect, useState } from 'react';
import Header from '../../components/header';
import styles from './styles.module.css';
import { api } from '../../services/api';
import Sale from '../types/sale';
import ShimmerLoader from '../../components/shimmer';

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
            <Header status={false} pageName='Histórico de vendas' goBack={true}/>
            <div className={styles.body}>
            {!sales ? (
                <>  
                    <ShimmerLoader />
                    <ShimmerLoader />
                    <ShimmerLoader />
                </>
            ):(
               <>
                {sales.length != 0 ? (sales.map(item => {
                    return (
                        <div className={styles.boxContainer} key={item.id}>
                            <div className={styles.card}>
                                <div className={styles.title}>
                                    <h1>{item.product.category}</h1>
                                    <strong>{item.amount} unidades</strong>
                                </div>
                                <strong>{item.product.description}</strong>
                            </div>
                        </div>
                        
                    );
                })):(
                    <div className={styles.noSale}>
                        <h3>Nenhuma venda realizada</h3>
                        <h3>😃👍</h3>
                    </div>
                )}
                </>
            )}
            </div>
        </div>
    );

}

export default History;