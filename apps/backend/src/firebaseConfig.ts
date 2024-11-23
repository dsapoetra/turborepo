import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Firestore Emulator
if (process.env.NODE_ENV !== 'production') {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  console.log('Using Firestore Emulator at localhost:8080'); // Debug log
} else {
  console.log('Using Firestore Cloud'); // Debug log
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'demo-project', // Ensure your .env has FIREBASE_PROJECT_ID
  });
  console.log('Firebase Admin initialized');
} else {
  console.log('Firebase Admin already initialized');
}

// Export Firestore instance
export const firestore = admin.firestore();
console.log('Firestore instance initialized:', firestore !== null); // Debug log
