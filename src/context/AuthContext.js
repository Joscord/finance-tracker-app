import { createContext, useReducer } from 'react';

const defaultState = {
	user: null,
};

export const authReducer = (state, action) => {
	switch (action.type) {
		// Definimos un caso para la acción de LOG_IN
		case 'LOGIN':
			return {
				// Nótese que usando el spread operator buscamos copiar todas las propiedades que habría en el estado anterior, en el caso de existir más propoiedades
				...state,
				// El valor de la prop user será lo que venga por payload
				user: action.payload,
			};
		default:
			return state;
	}
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, defaultState);

	return (
		<AuthContext.Provider value={{ ...state.dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
