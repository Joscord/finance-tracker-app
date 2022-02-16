// Importamos el componente Redirect. Cuando hagamos los checkeos para la autenticación del usuario usaremos este componente para redirigirlo dependiendo del caso
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './components/Navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
	// Tomamos el valor del usuario de nuestro contexto
	const { authIsReady, user } = useAuthContext();

	return (
		<div className='app'>
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<Switch>
						<Route exact path='/'>
							{/* Hacemos la revisión dentro, usando un operador ternario. Si hay un usuario puede ir al homepage sino es redirigido a la página de login */}
							{user ? <Home /> : <Redirect to={'/login'} />}
						</Route>
						<Route path='/login'>
							{/* En este caso queremos mostrarle la página de login sólo a los usuarios que no están logueados
							 */}
							 {!user ? <Login/> : <Redirect to={'/'}/>}
						</Route>
						<Route path='/signup'>
							{!user ? <Signup/> : <Redirect to={'/'}/>}
						</Route>
					</Switch>
				</BrowserRouter>
			)}
		</div>
	);
};

export default App;
