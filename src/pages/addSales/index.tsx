import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Product from "../types/product";
import Header from "../../components/header";

import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

//id compnay
//user_id, company_id, product_id, amount
//id usuario, products
///company/employee/:id




const id_company = localStorage.getItem("id.company");

function AddSales(){
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get(`/product/company/${id_company}`).then(response => {
            setProducts(response.data);
        })
    }, []);

    function navigation(id: string){
        navigate(`/sales/${id}`);
    }
    
    return (
        <div className={styles.container}>
            <Header goBack={true} pageName="Nova venda" status={true} />
            <div className={styles.containerBox}>
                {products.map( item => {
                    return (
                        <div key={item.id}>
                            <div className={styles.card}>
                                <button onClick={() => navigation(item.id)}>
                                        <h1>{item.category}</h1>
                                        <strong>{item.description}</strong>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default AddSales;