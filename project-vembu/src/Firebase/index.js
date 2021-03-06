import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

//configurations for firebase project account
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGING_SENDER,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

//initializes the app with the above configurations if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use the existing one
}

//access firebase storage
const storage = firebase.storage();
//access firebase firestore db
const db = firebase.firestore();

//export storage and db for use in other components and files
export { storage, db, firebase as default };
