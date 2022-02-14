import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName) => {
		setError(null);
		setIsPending(true);
		try {
			const response = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			dispatch({ type: 'LOGIN', payload: response.user });

			if (!response) {
				throw new Error('Could not complete Sign Up');
			}
			await response.user.updateProfile({ displayName });
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if(!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
	
	  return () => {
		setIsCancelled(true);
	  }
	}, [])
	

	return {
		error,
		isPending,
		signup,
	};
};

export default useSignup;
