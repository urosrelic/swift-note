import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvjCEg0ohd2PCG_Xeg1_BolwKtqnKHPyc',
  authDomain: 'swift-note-b69e1.firebaseapp.com',
  projectId: 'swift-note-b69e1',
  storageBucket: 'swift-note-b69e1.appspot.com',
  messagingSenderId: '389634556512',
  appId: '1:389634556512:web:a8058ca90dd13ee7fab905',
  measurementId: 'G-C6FBL84F6Q',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
