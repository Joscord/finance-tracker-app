import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	// Creamos las piezas de estado para el error, la carga y el estado para la función de cleanup
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	// Destructuramos la función de despacho
	const { dispatch } = useAuthContext();

	// Definimos la función de login. Esta función recibe como argumentos el email y el password
	const login = async (email, password) => {
		setIsPending(true);
		setError(null);
		try {
            // Para hacer el login en Firebase usamos el método signInWithEmailAndPassword
            const response = await projectAuth.signInWithEmailAndPassword(email, password);
            // Despachamos la acción para cambiar nuestro estado local
            dispatch({type: 'LOGIN', payload: response.user});

            // Hacemos un check antes de cambiar los estados del componente, lo mismo para el error
			if (!isCancelled) {
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};
	return {
		login,
		error,
		isPending,
	};
};
