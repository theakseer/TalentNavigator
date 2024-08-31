import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: import.meta.FIREBASE_KEY,
    authDomain: "akseerjs.firebaseapp.com",
    databaseURL: "https://akseerjs.firebaseio.com",
    projectId: "akseerjs",
    storageBucket: "akseerjs.appspot.com",
    messagingSenderId: "198290575938",
    appId: "1:198290575938:web:8df50575cb141a3c5453db"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);