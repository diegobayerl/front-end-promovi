import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext";

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
    <form onSubmit={handlesubmit}>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)}/>
      <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
      <button type="submit">Entrar</button>
    </form>
  )
}
