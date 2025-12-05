import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLHg58mJLDsqE1Upyhsa8zlxaWHYe9VIQ",
  authDomain: "mondayclone-78835.firebaseapp.com",
  projectId: "mondayclone-78835",
  storageBucket: "mondayclone-78835.firebasestorage.app",
  messagingSenderId: "1076986745002",
  appId: "1:1076986745002:web:bcd4588ba79c81213c80d3",
  measurementId: "G-XNZQSW13N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AUTH
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// DATABASE
const database = getDatabase(app);

export { 
  auth, 
  googleProvider, 
  microsoftProvider,
  signInWithPopup,
  onAuthStateChanged,
  database,
  ref,
  set
};