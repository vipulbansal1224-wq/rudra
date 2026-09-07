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
        const parsed = JSON.parse(dataStr);
        if (!parsed.theme) {
          parsed.theme = {
            primary: "#1e3a8a",
            secondary: "#facc15",
            headingText: "#111827",
            bodyText: "#4b5563",
            heroTitleSize: "60",
            heroSubtitleSize: "20",
            headingSize: "36",
            bodySize: "16"
          };
        }
        // Ensure new fields exist even if theme exists
        parsed.theme.heroTitleSize = parsed.theme.heroTitleSize || "60";
        parsed.theme.heroSubtitleSize = parsed.theme.heroSubtitleSize || "20";
        parsed.theme.headingSize = parsed.theme.headingSize || "36";
        parsed.theme.bodySize = parsed.theme.bodySize || "16";
        return parsed;
      }
    }
  } catch (error) {
    console.error("Redis not configured or error fetching:", error);
  }

  // Fallback to local JSON file
  const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileContents);
    if (!parsed.theme) {
      parsed.theme = {
        primary: "#1e3a8a",
        secondary: "#facc15",
        headingText: "#111827",
        bodyText: "#4b5563",
        heroTitleSize: "60",
        heroSubtitleSize: "20",
        headingSize: "36",
        bodySize: "16"
      };
    }
    parsed.theme.heroTitleSize = parsed.theme.heroTitleSize || "60";
    parsed.theme.heroSubtitleSize = parsed.theme.heroSubtitleSize || "20";
    parsed.theme.headingSize = parsed.theme.headingSize || "36";
    parsed.theme.bodySize = parsed.theme.bodySize || "16";
    return parsed;
  } catch (error) {
    console.error("Error reading fallback local content:", error);
    return {};
  }
}
