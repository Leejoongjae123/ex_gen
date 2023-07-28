import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBmHQZazsy52y3lV6vK5SZDUJgGhNUg4oE",
    authDomain: "exgen2-6155b.firebaseapp.com",
    projectId: "exgen2-6155b",
    storageBucket: "exgen2-6155b.appspot.com",
    messagingSenderId: "394272465234",
    appId: "1:394272465234:web:469721e10e42ca334a1a8b"
};


const app2 = initializeApp(firebaseConfig);
export const db = getFirestore()
