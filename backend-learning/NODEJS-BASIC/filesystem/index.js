const fs = require('fs');

//callback calling
const fileReadCallback = (error, data) => {
    if(error) {
        console.log("Oopsie, file tidak terbaca...")
    }
    console.log(data);
}

fs.readFile('notes.txt', 'UTF-8', fileReadCallback);

