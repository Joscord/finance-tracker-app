import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom/cjs/react-router-dom.min';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
