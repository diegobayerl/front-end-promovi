import { FormEvent, useState } from "react";

import styles from './styles.module.css';
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

function SignUp(){

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordOne, setPasswordOne] = useState('');

    async function handlesubmit(event: FormEvent){

        event.preventDefault();

        if(name && username && email && password){
            api.post('user', {
                name,
                username,
                email,
                password
            })

            navigate('/')
        } else {
            alert("Preencha todos os campos")
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <button onClick={() => history.back()}>X</button>
                <form onSubmit={handlesubmit}>
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" placeholder="digite nome completo..." onChange={ event => setName(event.target.value)}/>

                    <label htmlFor="username">Nome de usuário</label>
                    <input type="text" placeholder="digite nome de usuário"  id="username" onChange={ event => setUsername(event.target.value)}/>

                    <label htmlFor="email">E-mail</label>
                    <input type="email" placeholder="digite o email..." id="email" onChange={ event => setEmail(event.target.value)} />

                    <label htmlFor="passwordOne">Senha</label>
                    <input type="password" id="passwordOne" onChange={ event => setPasswordOne(event.target.value)} />

                    <label htmlFor="password">Repita a senha</label>
                    <input style={password===passwordOne?({borderColor: 'var(--green-200)'}):({borderColor: 'var(--red-200)'})} type="password" id="password" onChange={ event => {
                        setPassword(event.target.value)
                    }} />

                    <button style={password===passwordOne?({background: 'var(--purple-200)'}):({background: 'var(--red-200)', opacity: 0.5})} disabled={password!==passwordOne} type="submit">Criar usuário</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;