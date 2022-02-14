import { useState } from 'react'
import styles from './Login.module.css'

const Login = () => {
  // Usaremos un estado para hacer un seguimiento de lo que el usuario esté tipando en los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  // Definimos la función para manejar el envío del formulario
  const handleSubmit = e => {
    // Por ahora sólo prevendremos el comportamiento por default
    e.preventDefault();
  }
  return (
    // Nótese que no podemos usar notación de . si nuestra clase tiene - en estos casos usamos notación []
    <form onSubmit={handleSubmit}className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input 
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)} 
        />
      </label>
      <label>
        <span>Password</span>
        <input 
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)} 
        />  
      </label>
      <button className='btn'>Login</button>    
    </form>
  )
}

export default Login