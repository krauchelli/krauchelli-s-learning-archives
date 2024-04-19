const coffee = require('./coffee.js');
const buyTollRoadCard= require('../../../javascript/Asynchronous/Kuis Kedua/utils.js')

console.log(coffee.Minuman);

buyTollRoadCard(20)
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message));