// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdLayZNob1LWpiQRIVF0IEuxrY4cI2O6A",
  authDomain: "sys-mercado.firebaseapp.com",
  projectId: "sys-mercado",
  storageBucket: "sys-mercado.appspot.com",
  messagingSenderId: "554764738422",
  appId: "1:554764738422:web:b58eef71382733000ea457",
  measurementId: "G-VJZ7P89QW3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
