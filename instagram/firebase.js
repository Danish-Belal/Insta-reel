// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDMbEIEsOizcfnZUWEftjij6uvEC_tJsjk",
  authDomain: "instagram-reel-af2ee.firebaseapp.com",
  projectId: "instagram-reel-af2ee",
  storageBucket: "instagram-reel-af2ee.appspot.com",
  messagingSenderId: "619480291874",
  appId: "1:619480291874:web:b0397920a775563bc7487b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export {auth , storage};