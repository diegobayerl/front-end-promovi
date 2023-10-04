import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";
import Product from "../types/product";

function Details(){
    const navigate = useNavigate();

    const { id } = useParams();

    const user_id = localStorage.getItem('auth.user_id');
    const company_id = localStorage.getItem('id.company');
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
            amount: Number(amount),
        });

        navigate('/home');
    }

    return(
        <div>
            <Header goBack={true} pageName="Adicionar" status={true}/>
            <div>
                <h1>{product?.category}</h1>
                <strong>{product?.description}</strong>
            </div>
            <form onSubmit={handlesubmit}>
                <input placeholder="digite a quantidade" value={amount} onChange={event => setAmount(event.target.value)} type="number" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Details;