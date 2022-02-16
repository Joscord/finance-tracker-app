import firebase from 'firebase/app';
import 'firebase/firestore';
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
 
const projectAuth = firebase.auth();

// Función para crear timestamps
const timestamp = firebase.firestore.Timestamp

// Exportamos la función de creación de timestamp
export { projectFirestore, projectAuth, timestamp }; 