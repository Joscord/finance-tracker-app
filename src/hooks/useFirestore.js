import { useReducer, useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
        // El caso del error
        case 'ERROR':
            return { isPending: false, error: action.payload, success: false, document: null}
        // Creamos un nuevo caso para cuando añadimos un documento. Aquí cambiamos isPending, document y success. Lo único que no cambia es el error pero por si acaso podemos resetearlo a nulo de todas formas
        case 'ADD_DOCUMENT':
            return { isPending: false,  document: action.payload, success: true, error: null}
        case 'IS_PENDING':
            // Devolvemos explícitamente el nuevo objeto de estado. Dado que deseamos resetear la mayoría de las propiedades
            return {document: null, error: null,  isPending: true, success: false}
		default:
			return state;
	}
};
export const useFirestore = collection => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);
	const collectionRef = projectFirestore.collection(collection);
    // Como dentro del hook varias veces revisaremos el valor de isCancelled, vamos a crear una función para hacer esa evaluación. Este método recibirá una acción
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action);
        }
    }
	const addDocument = async (document) => {
        // Primero despachamos una acción para actualizar el estado de isPending a true e indicar que se está iniciando la carga. Dado que sólo necesitamos cambiar el valor de isPending no necesitamos enviar data adicional por lo que no hay payload
        dispatch({type: 'IS_PENDING'});
        // Iniciamos un bloque try/catch
        try {
            // Intentamos entonces añadir un documento con el método add. Este método nos devuelve una referencia del documento recién añadido
            const addedDocument = await collectionRef.add(document);  
            // Ahora vamos a despachar una acción pero recordemos que si debe ir una condicional aquí para las actualizaciones de estado. No queremos actualizar estado si el componente se desmontó (si isCancelled es true):
            dispatchIfNotCancelled({type: 'ADD_DOCUMENT', payload: addedDocument})

        } catch (err) { 
            // Si hay un error despachamos la acción siempre y cuando se cumpla la condición de isCancelled
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
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
