import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

export async function getContent() {
  try {
    // Try to get from Vercel KV first
    const data = await kv.get('rudraksh-content');
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Vercel KV not configured or error fetching:", error);
  }

  // Fallback to local JSON file (useful for first-time seeding)
  const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading fallback local content:", error);
    return {};
  }
}
