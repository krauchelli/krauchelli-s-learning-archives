const { EventEmitter } = require('events');

const myEventEmitter = new EventEmitter();

//fungsi yang akan dijalankan ketika event coffee-order terjadi
const makeCoffee = ({ name }) => {
    console.log(`Kopi ${name} telah dibuat!`);
};

//mendaftarkan fungsi makeCoffee sebagai listener event coffee-order
myEventEmitter.on('coffee-order', makeCoffee);

/*nama yang diberikan pada fungsi on tidak ada batasan atau aturan, yang penting
* bisa dipahami
* gunakan garis sebagai pengganti spasi*/

//gunakan emit untuk membangkitkan event
//myEventEmitter.emit('coffee-order', {name: 'Robusta'});

/**
 * fungsi emit() menerima nilai argumen sebanyak apa pun yang Anda mau,
 * namun nilai yang pertama merupakan nama dari event yang akan dibangkitkan, argumen
 * kedua dan seterusnya adalah nilai yang akan digunakan untuk menjadi dari parameter fungsi listener.*/

//kita juga bisa menambahkan fungsi listener .on() lebih dari satu

const makeBill = ({ price } ) => {
    console.log(`Bill sebesar ${ price } telah dibuat!`);
};

myEventEmitter.on('coffee-order', makeBill);

myEventEmitter.emit('coffee-order', {name: 'Robusta', price: 120000});


/**
 * Jika ingin menggunakan fungsi yang lebih dari satu seperti di atas, bisa juga
 * membuat satu fungsi khusus untuk menangani event
 * usually this function is named with 'handler' or 'listener at the end of the function's name*/

//contoh lain
const buyCar = ({ carName, carType} ) => {
    console.log(`Car ${carName} with ${carType} type sudah dibeli!`);
};
const billBuyCar = ({carPrice}) => {
    console.log(`Billing pembelian telah dibuat dengan harga ${carPrice}`);
    let taxPay = carPrice + 0.10;
    setTimeout(() => {
        console.log(`The tax will be included ${taxPay}`);
    }, 2000);
}
const boughtCarListener = ({carName, carPrice, carType}) => {
    buyCar({carName, carType});
    billBuyCar({carPrice});
}

//adding to .on()
myEventEmitter.on('beli-mobil', boughtCarListener);
//emitting
myEventEmitter.emit('beli-mobil', {carName: 'Xpander', carPrice: 12000000, carType: 'APV'});