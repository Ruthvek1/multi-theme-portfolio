import { NextResponse } from 'next/server';
import { adminStorage, adminAuth } from '@/lib/firebase/admin';
import path from 'path';

// Allowed file types (MIME type whitelist)
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  // ── Authentication check ──
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, error: 'Unauthorized. Please log in.' }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    await adminAuth.verifyIdToken(idToken);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Unauthorized. Invalid token.' }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
    }

    // ── File size validation ──
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 413 }
      );
    }

    // ── MIME type validation ──
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `File type "${file.type}" not allowed. Accepted: ${ALLOWED_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // ── File extension validation (double-check against MIME) ──
    const ext = path.extname(file.name).toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf', '.doc', '.docx'];
    if (!validExtensions.includes(ext)) {
      return NextResponse.json(
        { success: false, error: `File extension "${ext}" not allowed` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `uploads/${Date.now()}-${sanitizedName}`;

    // Upload to Firebase Storage
    const fileRef = adminStorage.file(filename);
    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
      public: true, // Make the file publicly accessible
    });

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${adminStorage.name}/${filename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Error uploading file to Firebase:', error);
    return NextResponse.json(
      { success: false, error: 'File upload failed' },
      { status: 500 }
    );
  }
}

