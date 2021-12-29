// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_id,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: API_KEY,

  authDomain: AUTH_DOMAIN,

  projectId: PROJECT_id,

  storageBucket: STORAGE_BUCKET,

  messagingSenderId: MESSAGING_SENDER_ID,

  appId: APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth();

export { auth, firebaseAuth };
