const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const addBook = async (req, res) => {
  const {
    book_id,
    title,
    description,
    published_year,
    author_name,
    genre_name,
  } = req.body;

  if (!book_id || !title || !description || !published_year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Checking if the author exists
    const authorExists = await sequelize.query(
      `SELECT author_id FROM author WHERE author_name = '${author_name}'`,
      { type: QueryTypes.SELECT }
    );

    // Checking if the genre exists
    const genreExists = await sequelize.query(
      `SELECT genre_id FROM genre WHERE genre_name = '${genre_name}'`,
      { type: QueryTypes.SELECT }
    );

    // Checking if the book already exists
    const bookExists = await sequelize.query(
      `SELECT book_id FROM books WHERE book_id = ${book_id}`,
      { type: QueryTypes.SELECT }
    );

    if (bookExists.length) {
      return res.status(400).json({ message: "Book already exists" });
    }

    if (!authorExists.length) {
      return res.status(400).json({ message: "Author does not exist" });
    }

    if (!genreExists.length) {
      return res.status(400).json({ message: "Genre does not exist" });
    }

    // Inserting data into the book table
    await sequelize.query(
      `INSERT INTO books (book_id, title, description, published_year) VALUES (${book_id}, '${title}', '${description}', ${published_year})`,
      { type: QueryTypes.INSERT }
    );

    // Inserting data into the book_authors and book_genres tables
    await sequelize.query(
      `INSERT INTO book_authors (book_id, author_id) VALUES (${book_id}, ${authorExists[0].author_id})`,
      { type: QueryTypes.INSERT }
    );

    await sequelize.query(
      `INSERT INTO book_genres (book_id, genre_id) VALUES (${book_id}, ${genreExists[0].genre_id})`,
      { type: QueryTypes.INSERT }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = addBook;
