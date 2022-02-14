import { useState } from 'react';
import styles from './Signup.module.css';

const Signup = () => {
  // Manejaremos 4 piezas de estado: nombre, email, password y confirmación de password
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Crearemos una función para validar que los passwords sean iguales
  const validatePassword = (password, confirmPassword) => password === confirmPassword;

  // Definimos la función para el envío del formulario 
  const handleSubmit = e => {
    e.preventDefault();
    // Usamos la función para validar password, si no coinciden entonces no seguimos con el envío
    if (!validatePassword(password, confirmPassword)) {
      alert('Passwords do not match')
      setPassword('');
      setConfirmPassword('');
      return;
    }

  }
  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <label>
        <span>Enter your name</span>
        <input 
        type='text'
        onChange={e => setDisplayName(e.target.value)}
        value={displayName}/>
      </label>
      <label>
        <span>Enter your email</span>
        <input 
        type='email'
        onChange={e => setEmail(e.target.value)}
        value={email}/>
      </label>
      <label>
        <span>Enter your password</span>
        <input 
        type='password'
        onChange={e => setPassword(e.target.value)}
        value={password}/>
      </label>
      <label>
        <span>Confirm your password</span>
        <input 
        type='password'
        onChange={e => setConfirmPassword(e.target.value)}
        value={confirmPassword}/>
      </label>
      <button className='btn'>Sign Up</button>
    </form>
  )
}

export default Signup