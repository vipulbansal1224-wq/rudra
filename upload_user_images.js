const fs = require('fs');
const path = require('path');

const targetItems = [
  "Conference & Board Rooms",
  "Meeting Rooms",
  "Classrooms & Training Rooms",
  "Auditoriums & Seminar Halls",
  "Video Conferencing Systems",
  "Public Address & Sound Reinforcement",
  "Digital Displays & Interactive Panels",
  "Professional Audio Systems (Mic, Amp, Speakers & DSP)",
  "PTZ Cameras and AV Control Systems"
];

const mediaDir = 'C:\\Users\\adfmin\\.gemini\\antigravity\\brain\\0512199e-4a21-48e3-b826-a9e44e9520b8\\.user_uploaded';

async function main() {
  console.log("Fetching current data...");
  const res = await fetch('https://rudra-jade-three.vercel.app/api/content');
  const result = await res.json();
  const data = result.data;

  // Get all images sorted by name
  let files = fs.readdirSync(mediaDir).filter(f => f.endsWith('.jpg'));
  files.sort();

  console.log(`Found ${files.length} images.`);

  let fileIndex = 0;

  for (let s of data.services) {
    for (let i = 0; i < s.items.length; i++) {
      let item = s.items[i];
      let text = typeof item === 'string' ? item : item.text;
      
      if (targetItems.includes(text.trim())) {
        console.log(`Processing: ${text}`);
        let localImages = [];
        for (let j = 0; j < 3; j++) {
          if (fileIndex < files.length) {
            const filepath = path.join(mediaDir, files[fileIndex]);
            const buffer = fs.readFileSync(filepath);
            const base64 = buffer.toString('base64');
            localImages.push(`data:image/jpeg;base64,${base64}`);
            fileIndex++;
          }
        }

        s.items[i] = {
          text: text,
          images: localImages
        };
      }
    }
  }

  console.log("Uploading updated data...");
  const postRes = await fetch('https://rudra-jade-three.vercel.app/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: 'Rudra@123',
      data: data
    })
  });

  const postResult = await postRes.json();
  console.log("Post result:", postResult);
}

main().catch(console.error);
