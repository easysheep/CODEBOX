
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: import.meta.env.FIRE_BASE_API_KEY,
  authDomain: "codebox-2ffc6.firebaseapp.com",
  projectId: "codebox-2ffc6",
  storageBucket: "codebox-2ffc6.appspot.com",
  messagingSenderId: "461979720608",
  appId:import.meta.env.FIRE_BASE_API_ID,
  measurementId: "G-DKDYT70CN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 