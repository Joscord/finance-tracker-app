import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
	const { logout } = useLogout();
	// Importamos el hook para utilizar nuestro contexto. Recordemos que de authContexnt obtenemos el objeto value que tiene la prop user el valor del estado. Este estado tiene una propiedad user cuyo valor nos indica si el usuario está o no conectado
	const { user } = useAuthContext();

	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>Finance App</li>
				{/* Mostramos el botón de login de manera condicional si el usuario no está conectado (user: null) */}
				{!user && (
					// Nótese que usamos un fragmento porque sólo podemos retornar un elemento raíz
					<>
						<li>
							<Link to={'/login'}>Login</Link>
						</li>
						<li>
							<Link to={'/signup'}>Signup</Link>
						</li>
					</>
				)}
				{/*Si el usuario está conectado mostramos el botón de  logout además de su nombre (que es una propiedad que habíamos añadido antes)*/}
				{user && (
					<>
						<li>Hello {user.displayName}</li>
						<li>
							<button className='btn' onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
