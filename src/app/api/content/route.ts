import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getContent } from '@/lib/getContent';

const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');

export async function GET() {
  try {
    const data = getContent();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Very basic password check - in real app use NextAuth or JWT
    if (body.password !== 'Rudra@123') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!body.data) {
      return NextResponse.json({ success: false, error: 'No data provided' }, { status: 400 });
    }

    // Backup previous content
    const backupPath = path.join(process.cwd(), 'src', 'data', `content.backup-${Date.now()}.json`);
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    // Save new content
    fs.writeFileSync(filePath, JSON.stringify(body.data, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
