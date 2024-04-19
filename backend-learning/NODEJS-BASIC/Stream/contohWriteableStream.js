const fs = require('fs');

const writeableStream = fs.createWriteStream('outputWrite.txt');


/*
* Perlu diketahui pada fungsi createWrite ini jika file yang disebutkan pada argumen tidak ada, nanti filenya akan dibuat sendiri
* dengan nama yang diinginkan.
* tapi tetap berhati-hati karena jika nama file yang dimasukkan ke dalam argumen ternyata sudah ada dan ada isinya, nanti akan tertimpam*/

writeableStream.write('Ini merupakan baris pertama!\n');
writeableStream.write('Ini merupakan baris kedua!\n');
writeableStream.end(); //selalu akhiri write stream dengan fungsi ini supaya tidak menyebabkan adanya memory leaks