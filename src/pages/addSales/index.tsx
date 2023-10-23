import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Product from "../types/product";
import Header from "../../components/header";

import Fuse from "fuse.js";

import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

import { Search } from "@mui/icons-material";

const id_company = localStorage.getItem("id.company");

interface Seach {
    item: {
        id: string;
        category: string;
        description: string;
    }
}

function AddSales(){
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<Seach[]>([])

    const options = {
        keys: ['description'],
    }

    const fuse = new Fuse(products, options);

    useEffect(() => {
        api.get(`/product/company/${id_company}`).then(response => {
            setProducts(response.data);
        })
    }, []);

    function navigation(id: string){
        navigate(`/sales/${id}`);
    }

    function filterProduct(seach: string){
        setSearch(fuse.search(seach) as []);
    }

    return (
        <div className={styles.container}>
            <Header goBack={true} pageName="Nova venda" status={true} />
            <div className={styles.search}>
            <input type="search" placeholder="pesquise pela descrição" onChange={ event => filterProduct(event.target.value)}/>
            <Search />
            </div>
            <div className={styles.containerBox}>
                { search.length != 0 ? (
                    search.map( items => {
                        return (
                            <div key={items.item.id}>
                                <div className={styles.card}>
                                    <button onClick={() => navigation(items.item.id)}>
                                            <h1>{items.item.category}</h1>
                                            <strong>{items.item.description}</strong>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ): (
                    products.map( items => {
                        return (
                            <div key={items.id}>
                                <div className={styles.card}>
                                    <button onClick={() => navigation(items.id)}>
                                            <h1>{items.category}</h1>
                                            <strong>{items.description}</strong>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
                
            </div>
        </div>
    );
}

export default AddSales;