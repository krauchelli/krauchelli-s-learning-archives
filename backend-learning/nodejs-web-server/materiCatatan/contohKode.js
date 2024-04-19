const http = require('http');

//semua logika yang berhubungan dengan server harus ditulis di dalam fungsi request listener
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
    response.end('<h1>Halo HTTP Server!</h1>');
};

//http.createserver()
const server = http.createServer(requestListener);