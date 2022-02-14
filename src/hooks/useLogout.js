import { useAuthContext } from './useAuthContext';
import { projectAuth } from '../firebase/config';
import { useState, useEffect } from 'react';

export const useLogout = () => {
	// Crearemos una nueva pieza de estado isCancelled. El valor inicial de este estado es false. Lo que haremos será actualizar el valor de esta pieza de estado en nuestra función de cleanup.
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);
		try {
			await projectAuth.signOut();
			dispatch({ type: 'LOGOUT' });
			// Antes de actualizar los estados vamos a revisar el valor de isCancelled y nótese que hacemos lo mismo para cuadno hay error en el bloque catch
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	// Usamos useEffect
	useEffect(() => {
		// Lo único que haremos es retornar una función de cleanup
		return () => {
			// Cambiamos el estado de isCancelled a true
			setIsCancelled(true);
		};
		// Dado que el arreglo de dependencias esta vacío esta función sólo se dispara la primera ve que se renderiza el componente
	}, []);

	return {
		error,
		isPending,
		logout,
	};
};
