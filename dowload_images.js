const axios = require('axios');
const fs = require('fs');
const path = require('path');

const images = {
  great_wall_of_china: [
    'https://images.unsplash.com/photo-1533158326338-04a6d2c31ca8?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1573547429388-3d4f3e518025?auto=format&fit=crop&w=1080',
  ],
  petra: [
    'https://images.unsplash.com/photo-1552641156-46b3415d6b63?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1572428960795-6fbd3f1b8014?auto=format&fit=crop&w=1080',
  ],
  christ_the_redeemer: [
    'https://images.pexels.com/photos/1619311/pexels-photo-1619311.jpeg',
    'https://images.pexels.com/photos/534504/pexels-photo-534504.jpeg',
  ],
  machu_picchu: [
    'https://images.unsplash.com/photo-1571391210943-1c68b5f3d0de?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1603769614773-c6c64646b5fc?auto=format&fit=crop&w=1080',
  ],
  chichen_itza: [
    'https://images.unsplash.com/photo-1603409292115-8aa3874239b6?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1636033693427-bd9de6b7e558?auto=format&fit=crop&w=1080',
  ],
  roman_colosseum: [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1586363091680-b0e8a7b79e9f?auto=format&fit=crop&w=1080',
  ],
  taj_mahal: [
    'https://images.unsplash.com/photo-1548013146-f68c27323c3d?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1583182330609-0b6565ef96a6?auto=format&fit=crop&w=1080',
  ]
};

const downloadImage = async (url, filepath) => {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const run = async () => {
  const folder = path.join(__dirname, 'wonders_images');
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  for (const [name, urls] of Object.entries(images)) {
    const dir = path.join(folder, name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    for (let i = 0; i < urls.length; i++) {
      const filepath = path.join(dir, `${name}_${i + 1}.jpg`);
      console.log(`Downloading ${filepath}`);
      await downloadImage(urls[i], filepath);
    }
  }
  console.log('All images downloaded.');
};

run().catch(console.error);