import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyCDJEOuDh0CMWhYW8a3nbkj8Z56Sqztd3E",
    authDomain: "todo-7cc19.firebaseapp.com",
    projectId: "todo-7cc19",
    storageBucket: "todo-7cc19.appspot.com",
    messagingSenderId: "669676638197",
    appId: "1:669676638197:web:6d86133b3a3b130ab95abc",
    measurementId: "G-MNGG9JMK0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app)

export {
    app, auth,analytics
}