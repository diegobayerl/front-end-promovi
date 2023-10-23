import { FormEvent, useContext, useState } from "react"

import { AuthContext } from "../../contexts/AuthContext";

import logoPromovi from '../../assets/logo-promovi.svg';
import styles from './styles.module.css';

import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(false);

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
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={password} 
              onChange={
                event => setPassword(event.target.value)
              }
            />

            {visible ? (
                <Visibility onClick={() => setVisible(false)} />
            ):( 
                <VisibilityOff onClick={() => setVisible(true)} />
            )}

            
          </div>
          <button type="submit">Entrar</button>
        </form>
        <div>
          <button>Esqueci minha senha</button>
          <hr/>
          <div>
            <Link to='signUp'>Não possui uma conta ?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
