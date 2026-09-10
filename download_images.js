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

async function downloadImage(prompt, filename) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true`;
  console.log(`Downloading: ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filename, buffer);
    return true;
  } catch (e) {
    console.error(`Failed to download ${filename}:`, e);
    return false;
  }
}

async function main() {
  const publicDir = path.join(__dirname, 'public', 'services');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Fetching current data...");
  const res = await fetch('https://rudra-jade-three.vercel.app/api/content');
  const result = await res.json();
  const data = result.data;

  for (let s of data.services) {
    for (let i = 0; i < s.items.length; i++) {
      let item = s.items[i];
      let text = typeof item === 'string' ? item : item.text;
      
      if (targetItems.includes(text.trim())) {
        console.log(`Processing: ${text}`);
        const safeName = text.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        
        const prompts = [
          `Professional corporate ${text} modern high quality`,
          `Detailed view of ${text} technology setup`,
          `Wide angle ${text} room installation`
        ];

        let localImages = [];
        for (let j = 0; j < 3; j++) {
          const filename = `${safeName}_${j+1}.jpg`;
          const filepath = path.join(publicDir, filename);
          await downloadImage(prompts[j], filepath);
          localImages.push(`/services/${filename}`);
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
