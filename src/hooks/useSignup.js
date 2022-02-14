import { useState } from 'react';
import { projectAuth } from '../firebase/config';
// Importamos nuestro custom hook
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	// Usamos nuestro custom-hook para obtener el objeto de contexto. De este destructuramos la función de despacho
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName) => {
		setError(null);
		setIsPending(true);
		try {
			const response = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			// despachamos la acción de login. Usando la función de dispatch que viene en el objeto de contexto. Pasamos en el payload la prop user que viene en la respuesta
			dispatch({ type: 'LOGIN', payload: response.user });

			if (!response) {
				throw new Error('Could not complete Sign Up');
			}
			await response.user.updateProfile({ displayName });
			setIsPending(false);
			setError(null);
		} catch (err) {
			setError(err.message);
			setIsPending(false);
		}
	};

	return {
		error,
		isPending,
		signup,
	};
};

export default useSignup;
