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
const firebaseConfig = {
	apiKey: 'AIzaSyDRtbQQscfq1wUAN-qTV3w8aDip8B36aMM',
	authDomain: 'school-mobile-app-34c3f.firebaseapp.com',
	projectId: 'school-mobile-app-34c3f',
	storageBucket: 'gs://school-mobile-app-34c3f.appspot.com',
	messagingSenderId: '387812497445',
	appId: '1:387812497445:web:bf96140e190cf79f3107cc',
	measurementId: 'G-HVJSEF9T7T',
	// gs://school-mobile-app-34c3f.appspot.com
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
