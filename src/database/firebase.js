//Importamos todos los servicios de firebase
/*
1.- firestore
2.- auth
3.- storage
4.- hosting
*/
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCWQqhdtFprhg_IZcTab6CtVJzOD2kdkO8',
	authDomain: 'dmm-192.firebaseapp.com',
	projectId: 'dmm-192',
	storageBucket: 'dmm-192.appspot.com',
	messagingSenderId: '24860642616',
	appId: '1:24860642616:web:39bd50ba590990218005cd',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*
Retornar los servicios de firebase 
*/

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

/* 
Generamos una librería reutilizable
*/
export default {
	db,
	auth,
	storage,
};
