import fs from 'fs';
import path from 'path';
import { createClient } from 'redis';

const client = process.env.REDIS_URL ? createClient({ url: process.env.REDIS_URL }) : null;

let isConnected = false;

export async function getContent() {
  try {
    if (client) {
      if (!isConnected) {
        await client.connect();
        isConnected = true;
      }
      
      const dataStr = await client.get('rudraksh-content');
      if (dataStr) {
        return JSON.parse(dataStr);
      }
    }
  } catch (error) {
    console.error("Redis not configured or error fetching:", error);
  }

  // Fallback to local JSON file
  const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading fallback local content:", error);
    return {};
  }
}
