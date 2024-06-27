import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDCn46hnBPH3KOrRqlJglOQUL3N2sJxrSk",
  authDomain: "hunger-halt-4b87e.firebaseapp.com",
  projectId: "hunger-halt-4b87e",
  storageBucket: "hunger-halt-4b87e.appspot.com",
  messagingSenderId: "653584864180",
  appId: "1:653584864180:web:a899088d41317db7e858e1",
  measurementId: "G-7NKP1JJDE3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging };
