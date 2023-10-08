// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFf07XCjZzVUgjdYRplVSaSx4cfsW2KZM",
  authDomain: "nextjs-image-user.firebaseapp.com",
  projectId: "nextjs-image-user",
  storageBucket: "nextjs-image-user.appspot.com",
  messagingSenderId: "1016175290085",
  appId: "1:1016175290085:web:dcc7c13bc357549445960c",
  measurementId: "G-5JJ12K96KN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
