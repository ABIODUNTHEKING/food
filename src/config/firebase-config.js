import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: process.env.REACT_APP_Firbase_Key,
    authDomain: process.env.REACT_APP_Auth_Domain,
    projectId: process.env.REACT_APP_Project_ID,
    storageBucket: process.env.REACT_APP_Storage_Bucket,
    messagingSenderId: process.env.REACT_APP_Message_Sender_ID,
    appId: process.env.REACT_APP_App_ID,
    measurementId: process.env.REACT_APP_Measurement_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app) 