import { createContext, useReducer, useEffect } from 'react';
// Importamos el objeto del servicio de autenticación de Firebase
import { projectAuth } from '../firebase/config';

// Nuestro estado inicial ahora incluye una nueva propiedad llamada authIsReady. El valor inicial de esta prop es false y básicamente lo que haremos con esta es evaluarla en el componente App e indicar que no queremos mostrar ningún componente a menos que sea true.
const defaultState = {
	user: null,
	authIsReady: false,
};

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			return { ...state, user: null };
			// Añadimos la acción de AUTH_IS_READY. Nótese que también volvemos la prop authIsReady: true para indicar que se hizo el checkeo de la autenticación
		case 'AUTH IS READY':
			return { ...state, user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, defaultState);
	// Queremos correr una función cuando el componente sea evaluado por primera vez, por lo que usaremos useEffect
	useEffect(() => {
		// Usamos el método onAuthStateChanged. Esta función se comunica con Firebase y básicamente dice: "avísanos si existe un cambio en el estado de autenticación y cuando haya quiero que dispares esta función". Esta función recibe el usuario como parámetro, por lo tanto, haremos que cuando ocurra un cambio actualicemos nuestro estado en la app de usuario. Nótese que este método nos retorna una función para desuscribirnos.
		const unsub = projectAuth.onAuthStateChanged(user => {
			// Cuando corre esta función entonces por primera vez podemos despachar una acción. El payload es el usuario, si firebase encuentra a uno entonces envía ese usuario como respuesta y si no es nulo
			dispatch({ type: 'AUTH_IS_READY', payload: user });
			// La función onAuthStateChanged se va a disparar siempre que ocurra un login o un logout, pero sólo queremos hacer esa revisión inicial. Por lo tanto debemos cancelar esa suscripción y lo hacemos con la función unsub que retorna. Así nunca volverá a ser llamada la función. Nótese que no hacemos una función de cleanup porque no se trata de correr una función mientras se desmonta el componente, esto ocurre antes de que se monte cualquiera
			unsub();
		});

		// Pasamos un arreglo vacío como dependencia para indicar que sólo correremos la función cuando cargue por primera vez
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
