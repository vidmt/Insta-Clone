import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: process.env.API_KEY,
    authDomain: "instagram-e5e55.firebaseapp.com",
    projectId: "instagram-e5e55",
    storageBucket: "instagram-e5e55.appspot.com",
    messagingSenderId: "751242169028",
    appId: "1:751242169028:web:fc20be048b3dd301f59791",
    measurementId: "G-E0Y00H10R2"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

export {firebase, FieldValue};