import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


/**
 * Lets the app know which Google Firebase server the app should talk to
 */

 const config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

const streakApp = initializeApp(config);
export const db = getFirestore(streakApp);
export const storage = getStorage(streakApp);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


/**
 * Accesses the firestore database
 * @param {*} collection 
 * @param {*} UID 
 * @returns document object matching the UID
 */
 export const getRef = (collection, UID) => {
  return doc( db, collection, UID )
}