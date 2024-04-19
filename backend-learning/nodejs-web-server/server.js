const http = require('http');
const buffer = require("buffer");

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-by', 'NodeJS');

    /**penambahan pada materi method request*/
        //const method = request.method;
        //atau seperti ini supaya rapih dan bisa mengambil lebih dari satu variabel(destructuring)
    const {method, url} = request;

    //bagian routing
    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "Ini adalah homepage!"
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "Ini adalah halaman about!",
            }));
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`
                }))
            });
        } else {
            response.statusCode = 400; //bad request
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    } else {
        response.statusCode = 404; //not found
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!'
        }));
    }

};


//running server
const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});