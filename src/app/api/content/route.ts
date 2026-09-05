import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getContent } from '@/lib/getContent';

export async function GET() {
  try {
    const data = await getContent();
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

    // Save new content to Vercel KV
    await kv.set('rudraksh-content', body.data);

    return NextResponse.json({ success: true, message: 'Content updated successfully in Vercel KV' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
