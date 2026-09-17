// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
// Read from env vars rather than hardcoded here - was a real, live
// project config committed to source. Worth doing even though a
// Firebase Web API key isn't a traditional secret (Firebase's own docs:
// it identifies the project, real access control is Security
// Rules/App Check, not hiding this value) - it still shouldn't be
// baked into source when different environments (dev/staging/prod)
// might reasonably point at different Firebase projects, and a repo
// scanner has no way to know it's not sensitive. See .env.example.
//
// The fallbacks below matter, not just for tidiness: getAuth(app) below
// throws synchronously - at module import time, crashing the entire app
// before anything renders - if apiKey isn't shaped like a real Firebase
// key (found while verifying this change actually works with .env.example's
// blank placeholders, the exact situation a fresh clone starts from).
// These are syntactically well-formed but not connected to any real
// Firebase project, the same "disposable but valid-shaped" approach
// school-backend's scripts/generate-dev-firebase-key.js already uses:
// initializeApp/getAuth/getFirestore/getStorage all succeed, and actual
// network calls fail later, gracefully (see authSlice.js login's own
// try/catch around signInWithCustomToken).
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'de-school-dev.firebaseapp.com',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'de-school-dev',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'de-school-dev.appspot.com',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
	appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
