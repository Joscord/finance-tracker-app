import { useReducer, useEffect, useState } from 'react';
// Importamos timestamp
import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
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
			// Creamos el timestamp con el método fromDate y pasando la fecha actual
			const createdAt = timestamp.fromDate(new Date());
            // Ahora a la función add le pasamos un nuevo objeto que tiene las propiedades del documento que deseamos agregar y también la prop createdAt
			const addedDocument = await collectionRef.add({...document, createdAt});
			dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addedDocument });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};
	const deleteDocument = async id => {};
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);
	return {
		addDocument,
		deleteDocument,
		response,
	};
};
