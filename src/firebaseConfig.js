// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 🔧 Replace these with your actual Firebase project values
// Go to: https://console.firebase.google.com → New Project → Web App → Copy config
const firebaseConfig = {
  apiKey: "AIzaSyCOK5bcWIGsVhRSk_i8sVL_XyDTD-t9lVQ",
  authDomain: "leetcode-4.firebaseapp.com",
  projectId: "leetcode-4",
  storageBucket: "leetcode-4.firebasestorage.app",
  messagingSenderId: "556317835766",
  appId: "1:556317835766:web:c09c60c789d6f2974087d7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Admin emails — only these can edit images
export const ADMIN_EMAILS = [
  'ramudridhanush@gmail.com',
  'dhanushpersonal4@gmail.com',
];