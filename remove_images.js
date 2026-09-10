const fs = require('fs');

async function main() {
  console.log("Fetching current data...");
  const res = await fetch('https://rudra-jade-three.vercel.app/api/content');
  const result = await res.json();
  const data = result.data;

  for (let s of data.services) {
    for (let i = 0; i < s.items.length; i++) {
      let item = s.items[i];
      let text = typeof item === 'string' ? item : item.text;
      
      // Clear all images
      s.items[i] = {
        text: text,
        images: []
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
