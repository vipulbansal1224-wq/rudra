import fs from 'fs';
import path from 'path';

export function getContent() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading content:", error);
    return {};
  }
}
