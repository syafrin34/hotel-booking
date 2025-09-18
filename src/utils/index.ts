import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDzZXSmdyU4iUkBGoBKNjZ66douJwxBuTA",
//   authDomain: "hotel-booking-e170b.firebaseapp.com",
//   databaseURL:
//     "https://hotel-booking-e170b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "hotel-booking-e170b",
//   storageBucket: "hotel-booking-e170b.firebasestorage.app",
//   messagingSenderId: "926269122619",
//   appId: "1:926269122619:web:3663d07a561bbef405141e",
// };

// Initialize Firebase
console.log("Database URL:", import.meta.env.VITE_DATABASE_URL);
console.log("Project ID:", import.meta.env.VITE_PROJECT_ID);
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
