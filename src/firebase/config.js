import firebase from 'firebase/app';
import 'firebase/firestore';
// Importamos el paqueta de autenticación
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAQQ1YG9Z-inRrMaYv9oWLWW196rM48Go4',
	authDomain: 'finance-backend-230db.firebaseapp.com',
	projectId: 'finance-backend-230db',
	storageBucket: 'finance-backend-230db.appspot.com',
	messagingSenderId: '714062893691',
	appId: '1:714062893691:web:104afd154c045c577488de',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
 
// Inicializamos el servicio de autenticación. Recordemos que esto implica obtener un objeto con diferentes métodos para manejar la autenticacion
const projectAuth = firebase.auth();

// Exportamos la autenticación
export { projectFirestore, projectAuth }; 