import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';

const ALLOWED_TYPES = ['personal', 'projects', 'experience', 'education', 'skills', 'certifications', 'socials'];

/**
 * GET /api/data?type=<type> — Public read access to portfolio data from Firestore
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || !ALLOWED_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `Invalid type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const docRef = adminDb.collection('portfolio').doc(type);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
    
    return NextResponse.json(docSnap.data()?.data || {});
  } catch (error) {
    console.error(`Error reading ${type} from Firestore:`, error);
    return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  }
}

/**
 * POST /api/data?type=<type> — Protected write access (requires Firebase ID token)
 */
export async function POST(request: Request) {
  // ── Authentication check ──
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    // Verify the Firebase ID token
    await adminAuth.verifyIdToken(idToken);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized. Invalid token.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || !ALLOWED_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `Invalid type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    // Basic payload size limit (1MB)
    const bodyStr = JSON.stringify(body);
    if (bodyStr.length > 1024 * 1024) {
      return NextResponse.json({ error: 'Payload too large (max 1MB)' }, { status: 413 });
    }

    const docRef = adminDb.collection('portfolio').doc(type);
    await docRef.set({ data: body });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error writing ${type} to Firestore:`, error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

