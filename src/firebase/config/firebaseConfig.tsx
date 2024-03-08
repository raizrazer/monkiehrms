// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWHBpkMi8kdrcLvDERipMuGCUFLUNozjc",
  authDomain: "monkie-hrms.firebaseapp.com",
  projectId: "monkie-hrms",
  storageBucket: "monkie-hrms.appspot.com",
  messagingSenderId: "103913131021",
  appId: "1:103913131021:web:ec90bf56f7cfb23e369944",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
