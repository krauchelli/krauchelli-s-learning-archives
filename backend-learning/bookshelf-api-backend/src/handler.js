const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
  const {
    name, year, author,
    summary, publisher, pageCount,
    readPage, reading,
  } = request.payload;
    // variabel teknis
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  // pengecekan baca sedang ongoing atau finished
  const finished = readPage === pageCount;

  const bukuBaru = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
    // pengecekan kondisi
  if (!bukuBaru.name) { // jika properti nama kosong
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (bukuBaru.readPage > bukuBaru.pageCount) { // jika readPage > pageCount
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  books.push(bukuBaru);

  // cek books sudah masuk atau belum
  const isSuccess = books.filter((isiarr) => isiarr.id === id).length > 0;
  const readPageCheck = bukuBaru.readPage > bukuBaru.pageCount;

  if (isSuccess && !readPageCheck && bukuBaru.name) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // jika gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(400);
  return response;
};

const getAllBooks = (request, h) => {
  // menarik objek spesifik berasal dari array books menggunakan fungsi map
  const importantBookObjects = books.map((item) => {
    const { id, name, publisher } = item;
    return { id, name, publisher };
  });

  // akses query parameter
  const nameQuery = request.query.name;
  const readingQuery = request.query.reading;
  const readingQueryBoolean = !!(+readingQuery);
  const finishedQuery = request.query.finished;
  const finishedQueryBoolean = !!(+finishedQuery);

  if (nameQuery !== undefined) {
    const filteredNameBooks = books.filter((item) => item.name.toLowerCase()
      .includes(nameQuery.toLowerCase()));
    const mappedBooks = filteredNameBooks.map((item) => {
      const { id, name, publisher } = item;
      return { id, name, publisher };
    });
    if (filteredNameBooks.length > 0) {
      const response = h.response({
        status: 'success',
        data: { books: mappedBooks },
      });
      response.code(200);
      return response;
    }
  }
  if (readingQuery !== undefined) {
    const filteredReadingBooks = books.filter((item) => item.reading === readingQueryBoolean);
    const mappedBooks = filteredReadingBooks.map((item) => {
      const { id, name, publisher } = item;
      return { id, name, publisher };
    });
    if (filteredReadingBooks.length > 0) {
      const response = h.response({
        status: 'success',
        data: { books: mappedBooks },
      });
      response.code(200);
      return response;
    }
  }
  if (finishedQuery !== undefined) {
    const filteredFinishedBooks = books.filter((item) => item.finished === finishedQueryBoolean);
    const mappedBooks = filteredFinishedBooks.map((item) => {
      const { id, name, publisher } = item;
      return { id, name, publisher };
    });
    if (filteredFinishedBooks.length > 0) {
      const response = h.response({
        status: 'success',
        data: {
          books: mappedBooks,
        },
      });
      response.code(200);
      return response;
    }
  }

  return h.response({
    status: 'success',
    data: {
      books: importantBookObjects,
    },
  });
};

const getSpecificBook = (request, h) => {
  const { bookId } = request.params;
  const specificBook = books.filter((item) => item.id === bookId)[0];

  if (specificBook !== undefined) {
    return {
      status: 'success',
      data: {
        book: specificBook,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editSpecificBook = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((item) => item.id === bookId);
  // jika nama kosong
  const nameIsEmpty = name === undefined;
  if (nameIsEmpty) { // jika properti nama kosong
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const readPageCheck = readPage > pageCount;
  if (readPageCheck) { // jika readPage > pageCount
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // jika tidak ada kesalahan pada index dan lain-lain
  if (index !== -1 && !nameIsEmpty) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  // jika tidak ada id invalid
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteSpecificBook = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((item) => item.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooks,
  getSpecificBook,
  editSpecificBook,
  deleteSpecificBook,
};
