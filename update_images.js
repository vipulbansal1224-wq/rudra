const fs = require('fs');

async function main() {
  console.log("Fetching current data...");
  const res = await fetch('https://rudra-jade-three.vercel.app/api/content');
  const result = await res.json();
  const data = result.data;

  let globalId = 1;

  console.log("Processing services...");
  for (let s of data.services) {
    let category = "office";
    if (s.title && s.title.includes("Audio Visual")) category = "conference,office";
    else if (s.title && s.title.includes("IT Hardware")) category = "server,computer";
    else if (s.title && s.title.includes("Security")) category = "cctv,security";

    for (let i = 0; i < s.items.length; i++) {
      let item = s.items[i];
      let text = typeof item === 'string' ? item : item.text;
      
      console.log(`Getting images for: ${text}`);
      
      const img1 = `https://loremflickr.com/600/400/${category}?random=${globalId++}`;
      const img2 = `https://loremflickr.com/600/400/${category}?random=${globalId++}`;
      const img3 = `https://loremflickr.com/600/400/${category}?random=${globalId++}`;

      s.items[i] = {
        text: text,
        images: [img1, img2, img3]
      };
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
