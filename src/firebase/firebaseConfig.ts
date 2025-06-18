// src/firebase/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC8kg7-wCShUqv3HKZTxzej-69XAKyP9kw',
  authDomain: 'icebreaker-df91a.firebaseapp.com',
  projectId: 'icebreaker-df91a',
  storageBucket: 'icebreaker-df91a.appspot.com',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
