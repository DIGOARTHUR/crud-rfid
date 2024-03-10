// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDHQ4RcVyPnVFPRgtVk7NNI42ZZzWLIQbQ",
  authDomain: "crud-firebase-with-rfid.firebaseapp.com",
  projectId: "crud-firebase-with-rfid",
  storageBucket: "crud-firebase-with-rfid.appspot.com",
  messagingSenderId: "502674276262",
  appId: "1:502674276262:web:eaa4a550f0f3d6284cd967",
  measurementId: "G-PE94RXGSP8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
