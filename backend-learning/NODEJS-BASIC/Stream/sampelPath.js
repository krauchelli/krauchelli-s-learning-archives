const path = require('path');
const fs = require('fs');
const {resolve} = require("path"); //di intellij idea, modulnya secara otomatis ditambahkan

const baca = path.resolve(__dirname, 'output.txt');
const readableStream = fs.createReadStream(baca, {
    highWaterMark: 16
});


//atau juga bisa pake cara ini, lgsg masukkan metode resolve
const bacaStream = fs.createReadStream(resolve(__dirname, 'output.txt'), {
    highWaterMark: 10
});

readableStream.on('readable', () => {
    try {
        process.stdout.write(readableStream.read());
    } catch (err) {

    }
});
readableStream.on('end', () => {
    console.log('Done');
});

readableStream.on('data', (chunk) => {
    console.log(chunk.toString);
})
