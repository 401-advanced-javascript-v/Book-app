'use strict';

const client = require('../../index.js');

class PostgreSQLModel {
  constructor(client) {
    this.client = client;
    console.log('in the model');

  }
  get(id) {
    // getBook - just one book
    if (id) {
      // do some stuff to get a single book from posgreSQL
      let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      return this.client.query(SQL, id)
    }

    // getBooks - all the books
    else {
      console.log('ran else pgmodel');
      // do some stuff to get all the books from posgreSQL
      let SQL = 'SELECT * FROM books;';
      return this.client.query(SQL)
    }
  }

  // helper for getBook (GET) - gets all records for booksehelves table
  getBookshelves() {
    let SQL = 'SELECT DISTINCT id, name FROM bookshelves ORDER BY name;';
    return this.client.query(SQL);
  }

  post(values) {
    // add a book to the SQL database
    let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
    return this.client.query(SQL, values)
  }

  // helper for createBook (POST) - checks bookshelves table for text entered & returns a bookshelf id
  // creates a new record in the bookshelves table if the one entered isn't found
  createShelf(shelf) {
    // INPUT <- bookshelf name from user
    // OUTPUT -> unique id for bookshelf in bookshelves table
    let normalizedShelf = shelf.toLowerCase();
    let SQL1 = `SELECT id from bookshelves where name=$1;`;
    let values1 = [normalizedShelf];

    return this.client.query(SQL1, values1)
      .then(results => {
        // if the bookshelf was already in the bookshelves table, return the id for that shelf
        if (results.rowCount) {
          return results.rows[0].id;

          // if it wasn't, make a new shelf in the table, return the id for that shelf
        } else {
          let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
          let insertValues = [shelf];

          return this.client.query(INSERT, insertValues)
            .then(results => {
              return results.rows[0].id;
            })
        }
      })
  }

  put(values) {
    // edit a book's bookshelf in the SQL db
    let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
    return this.client.query(SQL, values)
  }

  delete(id) {
    // delete a book from the SQL db
    let SQL = 'DELETE FROM books WHERE id=$1;';
    return this.client.query(SQL, id)
  }


}

class Books extends PostgreSQLModel { }

module.exports = new Books(client);
     
