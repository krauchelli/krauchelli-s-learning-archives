const {
  addBooksHandler,
  getAllBooks,
  getSpecificBook,
  editSpecificBook,
  deleteSpecificBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  { // nampilkan seluruh
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  { // nampilkan spesifik
    method: 'GET',
    path: '/books/{bookId}',
    handler: getSpecificBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editSpecificBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteSpecificBook,
  },
];

module.exports = routes;
