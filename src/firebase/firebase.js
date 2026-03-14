import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhdysQnUYKgOYPT28-sdDt1L7ONyuWyxI",
  authDomain: "dealkart-18257.firebaseapp.com",
  projectId: "dealkart-18257",
  storageBucket: "dealkart-18257.appspot.com",
  messagingSenderId: "779247101813",
  appId: "1:779247101813:web:c91b70368c5c3f0d15d53c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);