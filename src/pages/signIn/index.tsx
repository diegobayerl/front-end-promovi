import { FormEvent, useContext, useState } from "react"

import { AuthContext } from "../../contexts/AuthContext";

import logoPromovi from '../../assets/logo-promovi.svg';
import styles from './styles.module.css';

import { Lock, Person } from "@mui/icons-material";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handlesubmit(event: FormEvent){

    event.preventDefault();
    
    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <div className={styles.container}>
      <img src={logoPromovi} alt="logo promovi" />
      <div className={styles.boxContainer}>
        <form onSubmit={handlesubmit}>
          <div>
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={
                event => setEmail(event.target.value)
              }
            />
            <Person />
          </div>
          <div>
            <input 
              type="password"
              placeholder="Password"
              value={password} 
              onChange={
                event => setPassword(event.target.value)
              }
            />
            <Lock />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <div>
          <button>Esqueci minha senha</button>
          <hr/>
          <div>
            <a>Não possui uma conta ?</a>
          </div>
        </div>
      </div>
    </div>
  )
}