import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;
	useEffect(() => {
		let ref = projectFirestore.collection(collection);
        if (query) {
            ref = ref.where(...query);
        }
        if (orderBy) {
            // Utilizamos el método orderBy de Firestore. Este método recibe dos argumentos: primero la propiedad por la que queremos ordenar (como string) y como segundo argumento recibe 'ascending' o 'descending'. Los pasamos como un array y por eso usamos un ...
            ref = ref.orderBy(...orderBy);
        }
		const unsuscribe = ref.onSnapshot(snapshot => {
			let results = [];
			snapshot.docs.forEach(doc => {
				results.push({
					...doc.data(),
					id: doc.id,
				});
			});
            setDocuments(results);
            setError(null);
		}, err => {
            console.log(err);
            setError('Could not fetch data:'+err)
        });
        return () => unsuscribe();  
	}, [collection, query, orderBy]);

    return {
        documents,
        error
    }
};
