import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setIsPending(true);
		setError(null);
		try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password);
            dispatch({type: 'LOGIN', payload: response.user});

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
	// Añadí una función de cleanup para manejar isCancelled
	useEffect(() => {
		return () => setIsCancelled(true);
	}, [])
	return {
		login,
		error,
		isPending,
	};
};
