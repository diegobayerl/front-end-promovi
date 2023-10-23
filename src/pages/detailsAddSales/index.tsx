import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";
import Product from "../types/product";

import styles from './styles.module.css';

function Details(){
    const navigate = useNavigate();

    const { id } = useParams();

    const user_id = localStorage.getItem('auth.user_id');
    const company_id = localStorage.getItem('id.company');
    const schedula_id = localStorage.getItem('id.schedula');

    const [amount, setAmount] = useState('')

    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        api.get(`/product/${id}`).then(response => {
            setProduct(response.data)
        })
    }, []);

    function handlesubmit(event: FormEvent){
        event.preventDefault();

        api.post('/sale', {
            user_id,
            company_id,
            product_id: id,
            schedula_id,
            amount: Number(amount),
        });

        navigate('/home');
    }

    return(
        <div className={styles.container}>
            <Header goBack={true} pageName="Cadastrar venda" status={true}/>
            <div className={styles.body}>
                <div className={styles.title}>
                    <h1>{product?.category}</h1>
                    <strong>{product?.description}</strong>
                </div>
                <form onSubmit={handlesubmit}>
                    {amount === '0' || amount === '' && (
                        <label>*o valor da quantidade não pode ser zero</label>
                    )}
                    <input placeholder="digite a quantidade" value={amount} onChange={event => setAmount(event.target.value)} type="number" />
                    <button disabled={amount === '0' ||amount === ''} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Details;