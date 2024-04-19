const _ = require('lodash');

const listArrays = [1,2,3,4,5,6,7,8,8,9,12,23,13,35,6,553,32,32,32,56675,]
const cariGenap = (nilai) => {
    return nilai % 2;
}
const myOddEvenArray = _.partition(listArrays, cariGenap());

console.log(myOddEvenArray);