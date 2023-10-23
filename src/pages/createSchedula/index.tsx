import { FormEvent, useState } from "react";
import Header from "../../components/header";
import styles from "./styles.module.css";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";


function CreateSchedula(){
    const navigate = useNavigate();

    const user_id = localStorage.getItem('auth.user_id');
    const company_id = localStorage.getItem('id.company');
    const nameCompany = localStorage.getItem('name.company');

    const [name, setName] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [newDate, setDate] = useState('');

    async function handlesubmit(event: FormEvent){

        event.preventDefault();

        const date = new Date(newDate + ' 12:00:00')

        api.post('user/schedula', {
            name,
            neighborhood,
            city,
            nameCompany,
            company_id,
            user_id,
            date,
        })

        navigate('/home')
    }

    return (
        <div className={styles.container}>
            <Header goBack={true} pageName="Adicionar tarefa" status={false}/>
            <div className={styles.box}>
                <form onSubmit={handlesubmit}>
                    <label htmlFor="name">Nome da loja</label>
                    <input type="text" id="name" placeholder="digite nome da loja..." onChange={ event => setName(event.target.value)}/>

                    <label htmlFor="neighborhood">Bairro</label>
                    <input type="text" placeholder="digite o bairro da loja..."  id="neighborhood" onChange={ event => setNeighborhood(event.target.value)}/>

                    <label htmlFor="city">Cidade</label>
                    <input type="text" placeholder="digite a cidade da loja..." id="city" onChange={ event => setCity(event.target.value)} />

                    <label htmlFor="date">Data da visita</label>
                    <input type="date" id="date" onChange={ event => setDate(event.target.value)} />

                    <button type="submit">Cadastrar tarefa</button>
                </form>
            </div>
        </div>
    )
}

export default CreateSchedula;