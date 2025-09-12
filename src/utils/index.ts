import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDzZXSmdyU4iUkBGoBKNjZ66douJwxBuTA",
  authDomain: "hotel-booking-e170b.firebaseapp.com",
  databaseURL:
    "https://hotel-booking-e170b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-booking-e170b",
  storageBucket: "hotel-booking-e170b.firebasestorage.app",
  messagingSenderId: "926269122619",
  appId: "1:926269122619:web:3663d07a561bbef405141e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
