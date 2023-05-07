const fs = require('fs');
const path = require('path');
const road = path.join(__dirname, 'text.txt');
const readStream = fs.ReadStream(road, 'utf-8');

readStream.on('data', chunk => {
    console.log(chunk);
});
