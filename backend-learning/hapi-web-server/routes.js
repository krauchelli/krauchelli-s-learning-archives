const routes =  [
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return `Halaman tidak ditemukan!`;
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        }
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return "Halaman tidak dapat diakses dengan method";
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About Page';
        }
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return "Halaman tidak dapat diakses dengan method";
        }
    },
    //menambahkan objek path parameter
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const {name = "stranger"} = request.params;
            const { lang } = request.query; //query parameter

            if (lang === 'id') {
                return `Halo, ${name}`;
            }

            return `Hello, ${name}!`;
        }
    }
];

module.exports = routes;