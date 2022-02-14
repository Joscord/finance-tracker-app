import { useState } from 'react';
import styles from './Signup.module.css';
import  useSignup  from '../../hooks/useSignup';

const Signup = () => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	// Importamos el custom hook useSignup. Recordemos que el hook en sí no recibe ningún argumento sino que lo recibe la función signup
	const { error, isPending, signup } = useSignup();  

	const validatePassword = (password, confirmPassword) =>
		password === confirmPassword;

	const handleSubmit = e => {
		e.preventDefault();
		if (!validatePassword(password, confirmPassword)) {
			alert('Passwords do not match');
			setPassword('');
			setConfirmPassword('');
			return;
		}
    signup(email, password, displayName);
    // Reseteamos los campos luego del registro
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');

	};
	return (
		<form onSubmit={handleSubmit} className={styles['signup-form']}>
			<label>
				<span>Enter your name</span>
				<input
					type='text'
					onChange={e => setDisplayName(e.target.value)}
					value={displayName}
				/>
			</label>
			<label>
				<span>Enter your email</span>
				<input
					type='email'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Enter your password</span>
				<input
					type='password'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			<label>
				<span>Confirm your password</span>
				<input
					type='password'
					onChange={e => setConfirmPassword(e.target.value)}
					value={confirmPassword}
				/>
			</label>
      {/* Mostramos este botón cuando isPending es false */}
			{!isPending && <button className='btn'>Sign Up</button>}
      {/* Usamos el estado de error para mostrar si hay error */}
      {isPending && <button className='btn' disabled>Loading</button>}
      {error && <p>{error}</p>}
		</form> 
	);
};

export default Signup;
