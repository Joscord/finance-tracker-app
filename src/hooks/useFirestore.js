import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		// Añadimos un nuevo caso
		case 'DELETED_DOCUMENT':
			return {isPending: false, document: null, success: true, error: null}
		case 'ERROR':
			return {
				isPending: false,
				error: action.payload,
				success: false,
				document: null,
			};
		case 'ADD_DOCUMENT':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			};
		case 'IS_PENDING':
			return { document: null, error: null, isPending: true, success: false };
		default:
			return state;
	}
};
export const useFirestore = collection => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);
	const collectionRef = projectFirestore.collection(collection);
	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			dispatch(action);
		}
	};
	const addDocument = async document => {
		dispatch({ type: 'IS_PENDING' });
		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await collectionRef.add({...document, createdAt});
			dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addedDocument });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};
	const deleteDocument = async id => {
		// Primero despacharemos una acción tipo IS_PENDING, dado que estamos iniciando un proceso de cara a la base de dato
		dispatch({type: 'IS_PENDING'});
		// Intentamos borrar el documento dentro de un bloque try catch
		try {
			// Usamos el método delete que nos retorna la referencia del documento borrado
			const deletedDocument = await collectionRef.doc(id).delete();
			// Usamos la función para evaluar si podemos o no actualizar los estados en base al ciclo de vida del componente
			dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'});
		} catch (err) {
			dispatchIfNotCancelled({type: 'ERROR', payload: err.message});
		}
	};
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);
	return {
		addDocument,
		deleteDocument,
		response,
	};
};
