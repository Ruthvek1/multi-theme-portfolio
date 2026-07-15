import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Vercel sometimes adds quotes around the private key or alters the newlines.
    // This aggressively cleans the private key to ensure it is always valid.
    let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
    
    // Remove surrounding quotes if they exist
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
      privateKey = privateKey.slice(1, -1);
    }
    
    // Replace literal '\n' string characters with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage().bucket();
export const adminAuth = admin.auth();
