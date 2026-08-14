import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_TYPES = ['personal', 'projects', 'experience', 'education', 'skills', 'certifications', 'socials'];

/**
 * GET /api/data?type=<type> — Public read access to portfolio data from local JSON files
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
    const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading ${type} from local JSON:`, error);
    return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  }
}

/**
 * POST /api/data?type=<type> — Admin updates disabled
 */
export async function POST(request: Request) {
  // Return an error so the admin UI gracefully fails without modifying anything
  return NextResponse.json(
    { error: 'Admin updates have been permanently disabled for security.' }, 
    { status: 403 }
  );
}
