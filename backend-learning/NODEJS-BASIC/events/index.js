//todo1
const { EventEmitter } = require('events');


const birthdayEventListener = (name) => {
    console.log(`Happy Birthday ${name} !`);
}

//todo2
const myEmitter = new EventEmitter();

//todo3
myEmitter.on('birthday', birthdayEventListener);

//todo4
myEmitter.emit('birthday', "Dimas");