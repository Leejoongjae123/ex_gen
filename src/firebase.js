import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from 'firebase/database'

function initializeAppIfNecessary() {

try {

return getApp();

} catch (any) {

const firebaseConfig = {
    apiKey: "AIzaSyBbCk0_6iPsf4vtMglKDGxq1RylIqFOpRU",
    authDomain: "experience-gen.firebaseapp.com",
    databaseURL: "https://experience-gen-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "experience-gen",
    storageBucket: "experience-gen.appspot.com",
    messagingSenderId: "482251345692",
    appId: "1:482251345692:web:b3c929e1775fe90566b4d9",
    measurementId: "G-3S3VMHKZ81"
};
return initializeApp(firebaseConfig);
}
}

const app = initializeAppIfNecessary();
export const dbService = getFirestore();
export const database = getDatabase();
