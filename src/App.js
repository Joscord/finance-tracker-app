import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './components/Navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
	// Usamos nuestro custom hook para manejar el contexto. Destructuramos la propiedad authIsReady.
	const { authIsReady } = useAuthContext();

	return (
		<div className='app'>
			{/* Prevenimos que todo lo de este árbol de componentes se muestre si aún no se hace realizado la revisión de la autenticación en Firebase (usando authIsReady) */}
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={Signup} />
					</Switch>
				</BrowserRouter>
			)}
		</div>
	);
};

export default App;
