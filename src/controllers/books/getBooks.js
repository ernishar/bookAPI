const { QueryTypes } = require("sequelize");
const sequelize = require("../../utils/connection");

const getBooks = async (req, res) => {
  try {
    // Fetching all the books
    const booksResult = await sequelize.query(`SELECT * FROM books`, {
      type: QueryTypes.SELECT,
    });

    return res.status(200).json({ message: "success", books: booksResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getBooks;
