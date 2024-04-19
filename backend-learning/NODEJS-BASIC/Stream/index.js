const fs = require('fs');
const { resolve }= require('path');

const bacaStream = fs.createReadStream(resolve(__dirname, "input.txt"), {
    highWaterMark: 15
});
const tulisStream = fs.createWriteStream(resolve(__dirname, "output.txt"));

bacaStream.on('readable', () => {
    try {
        tulisStream.write(`[${bacaStream.read()}]\n`);
    } catch (err) {
        //show error
    }
});

bacaStream.on('end', () => {
    tulisStream.end();
});