// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore, doc ,setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu3tXjG0-LQcpEPMGVE4_YE7h19ELBlT0",
  authDomain: "financly-react-95962.firebaseapp.com",
  projectId: "financly-react-95962",
  storageBucket: "financly-react-95962.appspot.com",
  messagingSenderId: "834901269049",
  appId: "1:834901269049:web:b63f2e850ba1d1684e0be8",
  measurementId: "G-BJWN1J8BHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc,createUserWithEmailAndPassword};
