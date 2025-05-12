// firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MSG_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from './constants';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY, // Get this from your Project Settings
  authDomain: FIREBASE_AUTH_DOMAIN, // This is based on your Project ID
  projectId: FIREBASE_PROJECT_ID, // Your Project ID
  storageBucket: FIREBASE_STORAGE_BUCKET, // This is based on your Project ID
  appId: FIREBASE_APP_ID, // Get this from your Project Settings for your *web* app
  messagingSenderId: FIREBASE_MSG_SENDER_ID, // Get this from your Project Settings
  measurementId: FIREBASE_MEASUREMENT_ID, // Get this if you're using Google Analytics for Firebase
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
