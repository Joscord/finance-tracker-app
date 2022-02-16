import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useCollection = collection => {
	// Creamos una pieza de estado para los documentos
	const [documents, setDocuments] = useState(null);
	// Creamos una pieza de estado para el error
	const [error, setError] = useState(null);
	// Usamos useEffect. Dependiendo de la colección (por ejemplo si es la de un usuario o la de otro) se debe generar una nueva suscripción. Queremos que este código corra apenas se monte el componente y por eso va en useEffect
	useEffect(() => {
		// Steamos un listener en tiempo real a una colección de Firestore. Nótese que usamos let en lugar de const porque puede que actualicemos esta referencia a futuro
		let ref = projectAuth.collection(collection);
		// El listener en este caso es onSnapshot. Recordemos que este método va a ejecutar la función en su cuerpo siempre que se reciba un snapshot de firebase. El snapshot representa la colección en ese momento en el tiempo. Como la colección es una dependencia de useEffect, si se actualiza esta función de onSnapshot de volverá a llamar y podremos volver a hacer el fetch de la colección
		const unsuscribe = ref.onSnapshot(snapshot => {
			// Crearemos una nueva variable local llamada results, que corresponderá inicialmente a un arreglo vacío
			let results = [];
			// Recordemos que dentro del snapshot la propiedad docs representa a los documentos en la colección. Iteramos a través de estos.
			snapshot.docs.forEach(doc => {
				// Empujamos un nuevo objeto a la colección. Colocamos la data del documento con el método data(). También añadimos una propiedad id (QUE NO ES LA MISMA QUE EL UID, que es el id del usuario). Esta es la id del documento
				results.push({
					...doc.data(),
					id: doc.id,
				});
			});
            // Actualizamos el estado
            setDocuments(results);
            // Y actualizamos el error
            setError(null);
            // recordemos que el segundo argumento de onSnapshot es una función de error
		}, err => {
            console.log(err);
            setError('Could not fetch data:'+err)
        });
        // Lo último es la función de cleanup
        return () => unsuscribe();  
	}, [collection]);

    // Retornamos valores de nuestro custom hook
    return {
        documents,
        error
    }
};
