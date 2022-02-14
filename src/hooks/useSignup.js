// Importamos useState
import { useState } from "react";
// Importamos el objeto de autenticación de Firebase
import { projectAuth } from "../firebase/config";
const useSignup = () => {
    // Creamos estados para el error y la carga
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    // Creamos la función para registrarnos. Nótese que será asíncrona. Además, sólo hay ciertas propiedades que Firebase permite que se usen en el registro (por ejemplo no podríamos poner color favorito). Si quisiéramos guardar información adicional del usuario usaríamos un documento de Firestore para ese usuario
    const signup = async (email, password, displayName) => {
        // Primero decimos que el error es nulo, en caso por ejemplo de que algo falle en el registro (ocurre un error) y debemos volver a intentar registrarnos queremos comenzar con un error nulo
        setError(null);
        // Como comenzamos el proceso de registro debemos dejar el estado de pendiente como verdadero
        setIsPending(true);    
        // Usamos un bloque try/catch para intentar capturar el error de haber uno 
        try {
            // Intentamos registrar el usuario, usamos el método createUserWithEmailAndPasswords del objeto auth para registrar un usuario. Este método tiene dos argumentos: email y password. Este método devuelve una respuesta
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)
            // el objeto response tiene una propiedad user, que es el usuario que estamos creando
            console.log(response.user);
            // Si la respuesta es null (no válida) arrojamos un error
            if (!response) {
                throw new Error('Could not complete Sign Up');
            }
            // ¿y el nombre? lo que tenemos que hacer es que luego de crear el usuario vamos a actualizar el perfil del usuario añadiendo la propiedad del nombre. Para esto usamos el método de la prop user updateProfile(). Este método recibe un objeto como un argumento
            await response.user.updateProfile({ displayName });
            // Cuando esto se complete terminamos la carga
            setIsPending(false);
            setError(null);
        } catch (err) {
            // Mostramos el error por consola y cambiamos los estados
            setError(err.message);
            setIsPending(false);
        }
    }

    // del Hook vamos a disponer el error, isPending y la función para efectuar el registro
  return {
      error,
      isPending,
      signup
  }
}

export default useSignup;