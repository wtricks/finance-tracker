// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore, doc ,setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjpBgq4oGg-ud-GzhqLTnuN1iJKwGdYNY",
  authDomain: "finance-tracker-39f4f.firebaseapp.com",
  projectId: "finance-tracker-39f4f",
  storageBucket: "finance-tracker-39f4f.appspot.com",
  messagingSenderId: "718053316357",
  appId: "1:718053316357:web:5cc7dbb511bb841fe6096c",
  measurementId: "G-W221VJL46G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc,createUserWithEmailAndPassword};
