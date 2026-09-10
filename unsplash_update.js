const fs = require('fs');

const targetItems = {
  "Conference & Board Rooms": "conference room board room corporate",
  "Meeting Rooms": "meeting room corporate office",
  "Classrooms & Training Rooms": "modern classroom training room",
  "Auditoriums & Seminar Halls": "auditorium stage seminar hall",
  "Video Conferencing Systems": "video conferencing meeting camera screen",
  "Public Address & Sound Reinforcement": "microphone public address speaker auditorium",
  "Digital Displays & Interactive Panels": "interactive display smart board touchscreen office",
  "Professional Audio Systems (Mic, Amp, Speakers & DSP)": "professional audio mixer amplifier microphone",
  "PTZ Cameras and AV Control Systems": "ptz camera av control room broadcast"
};

async function getUnsplashImages(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=3`;
  console.log(`Fetching from Unsplash: ${query}`);
  try {
    // Unsplash might require a user-agent to avoid blocking
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const json = await res.json();
    return json.results.map(r => r.urls.raw + '&w=800&q=80');
  } catch (e) {
    console.error("Failed to fetch unsplash:", e);
    return [];
  }
}

async function main() {
  console.log("Fetching current data...");
  const res = await fetch('https://rudra-jade-three.vercel.app/api/content');
  const result = await res.json();
  const data = result.data;

  for (let s of data.services) {
    for (let i = 0; i < s.items.length; i++) {
      let item = s.items[i];
      let text = typeof item === 'string' ? item : item.text;
      const cleanText = text.trim();
      
      if (targetItems[cleanText]) {
        console.log(`Processing: ${cleanText}`);
        const urls = await getUnsplashImages(targetItems[cleanText]);
        if (urls.length === 3) {
          s.items[i] = {
            text: text,
            images: urls
          };
          console.log(`Successfully mapped 3 images for ${cleanText}`);
        } else {
          console.log(`Warning: Found ${urls.length} images for ${cleanText}`);
        }
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
