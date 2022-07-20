import { getFirestore } from "@firebase/firestore";
import { initializeAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACLBxYnPqE_h8MPg8HGrxvHoqSCWF_bv0",
  authDomain: "image-gallery-d18fd.firebaseapp.com",
  projectId: "image-gallery-d18fd",
  storageBucket: "image-gallery-d18fd.appspot.com",
  messagingSenderId: "388249994263",
  appId: "1:388249994263:web:fb4d10968a4a6e67e70852",
  measurementId: "G-YN27W7PJ0Q",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: browserSessionPersistence,
});
export const db = getFirestore(app);
export const analytics =
  typeof window !== "undefined" ? initializeAnalytics(app) : null;
