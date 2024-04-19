const path = require('path');
const fs = require('fs');

const readableStream  = fs.createReadStream('./catatanStream.txt', {
    highWaterMark: 10
});

readableStream.on('readable', () => {
    try {
        process.stdout.write(`[${readableStream.read()}]`); //menggunakan array untuk memisah per hitungan karakter
    } catch (err) {
        console.log("Error message mu: " + err.message);
    }
}); //ingat .on() merupakan salah satu bagian dari event

readableStream.on('end', () => {
    console.log('Done');
});


/**
 * Perlu diketahui penamaan event harus 'readable' dan 'end'.
 * Jika tidak output tidak akan keluar.
 * */
