import { useEffect, useState } from 'react';
import Header from '../../components/header';
import styles from './styles.module.css';
import { api } from '../../services/api';
import Sale from '../types/sale';
import ShimmerLoader from '../../components/shimmer';

function Nuntiare(){
    const id = localStorage.getItem('auth.user_id');
    const [sales, setSales] = useState<Sale[]>([]);

    const date = new Date();

    useEffect(() => {
        api.get(`/sale/date?one=${date}&two=${date}&id=${id}`).then(response => {
            setSales(response.data);
        });
    }, []);
    
    return (
        <div className={styles.container}>
            <Header status={true} pageName='Relatório de vendas' goBack={true}/>
            <div className={styles.body}>
            {!sales ? (
                <>
                    <ShimmerLoader />
                    <ShimmerLoader />
                    <ShimmerLoader />
                </>
            ):(
               <>
                {sales.map(item => {
                    return (
                        <div className={styles.boxContainer} key={item.id}>
                            <div className={styles.card}>
                                <div className={styles.title}>
                                    <h1>{item.product.category}</h1>
                                    <strong>{item.amount} unidades</strong>
                                </div>
                                <strong>{item.product.description}</strong>
                            </div>
                            <hr/>
                        </div>
                        
                    );
                })}
                </>
            )}
            </div>
        </div>
    );

}

export default Nuntiare;

/**
 * 
 * 
 */