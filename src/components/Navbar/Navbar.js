import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLogout }  from '../../hooks/useLogout';

const Navbar = () => {
	// De nuestro custom hook vamos a destructurar la función de logout
	const { logout } = useLogout(); 
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>Finance App</li>
				<li>
					<Link to={'/login'}>Login</Link>
				</li>
				<li>
					<Link to={'/signup'}>Signup</Link>
				</li>
        <li>
          {/* Creamos un botón para el logout, asociando la función de logout al evento click */}
          <button className='btn' onClick={logout}>Logout</button>
        </li> 
			</ul>
		</nav>
	);
};

export default Navbar;
