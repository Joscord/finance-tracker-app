import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin }  from '../../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const {login, error, isPending} = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  }
  return (
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
      {isPending && <button disabled className='btn'>Loading...</button>}
      {!isPending && <button className='btn'>Login</button> } 
      {error && <p>{error}</p>} 
    </form>
  )
}

export default Login