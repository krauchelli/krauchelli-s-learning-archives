const fs = require('fs');

const fileReadCallback = (error, data) => {
    if (error) {
        console.log(`Gagal membaca berkas!`);
        return;
    }
    console.log(data)
};

//menggunakan fs, metode ini menerima 3 parameter atau argumen, yaitu
//lokasi berkas, encoding, callback function

fs.readFile('NODEJS-BASIC/events/catatan.txt', 'UTF-8', fileReadCallback);


//alternatif versi sinkronus
const data = fs.readFileSync('to-do.txt', 'UTF-8');
console.log(data);