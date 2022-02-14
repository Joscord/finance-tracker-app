import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
          <nav className={styles.navbar}>
              <ul>
                <li className={styles.title}>Finance App</li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Signup</Link></li>

              </ul>
          </nav>
  )
}

export default Navbar;