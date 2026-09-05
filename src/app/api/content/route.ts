import { NextResponse } from 'next/server';
import { createClient } from 'redis';
import { getContent } from '@/lib/getContent';

const client = process.env.REDIS_URL ? createClient({ url: process.env.REDIS_URL }) : null;
let isConnected = false;

export async function GET() {
  try {
    const data = await getContent();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Very basic password check
    if (body.password !== 'Rudra@123') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!body.data) {
      return NextResponse.json({ success: false, error: 'No data provided' }, { status: 400 });
    }

    if (client) {
      if (!isConnected) {
        await client.connect();
        isConnected = true;
      }
      
      // Save new content to Redis
      await client.set('rudraksh-content', JSON.stringify(body.data));
    } else {
      console.warn("No REDIS_URL found. Data cannot be saved permanently.");
      return NextResponse.json({ success: false, error: 'Database not configured on server' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully in Redis' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
