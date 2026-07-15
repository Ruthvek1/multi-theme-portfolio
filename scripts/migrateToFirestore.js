const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();
const dataDir = path.join(__dirname, '..', 'src', 'data');

async function migrate() {
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const docName = path.basename(file, '.json');
    const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));

    // Upload to Firestore under 'portfolio' collection
    await db.collection('portfolio').doc(docName).set({ data: content });
    console.log(`Migrated ${file} to Firestore portfolio/${docName}`);
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(console.error);
