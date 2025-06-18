// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8kg7-wCShUqv3HKZTxzej-69XAKyP9kw",
  authDomain: "icebreaker-df91a.firebaseapp.com",
  projectId: "icebreaker-df91a",
  storageBucket: "icebreaker-df91a.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
