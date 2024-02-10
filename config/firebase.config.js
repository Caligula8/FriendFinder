import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNnOU7nUbr8z1bMe947rZdnwh4guVUrbk",
  authDomain: "friendfinder-9168d.firebaseapp.com",
  projectId: "friendfinder-9168d",
  storageBucket: "friendfinder-9168d.appspot.com",
  messagingSenderId: "193227636381",
  appId: "1:193227636381:web:d1b1aa7f7621450b8cde74",
  measurementId: "G-WEE64SB1HZ",
};
// Check if Firebase app is not already initialized
if (getApps().length === 0) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Auth with AsyncStorage as persistence
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// Get the initialized app
const app = getApp();

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);
const firebaseStorage = getStorage(app);

export { app, firebaseAuth, firestoreDB, firebaseStorage };
