import { createContext, useReducer } from 'react';

const defaultState = {
	user: null,
};

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
        case 'LOGOUT':
            // Simplemente retornamos el estado inicial/por defecto donde la prop user es null
            return defaultState;
		default:
			return state;
	}
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, defaultState);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
