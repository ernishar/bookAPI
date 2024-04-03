const { QueryTypes } = require("sequelize");

const sequelize = require("../../utils/connection");

const addAuthor = async (req, res) => {
  const { id, name, bio } = req.body;

  if (!id || !name || !bio) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Checking if the author already exists
    const getAuther = await sequelize.query(
      `SELECT * FROM author WHERE author_id = ${id}`,
      { type: QueryTypes.SELECT }
    );

    // Checking if the author already exists
    if (getAuther.length) {
      return res.status(400).json({ message: "Author already exists" });
    }

    // Inserting data into the author table
    await sequelize.query(
      `INSERT INTO author (author_id, author_name, author_bio) VALUES (${id}, '${name}', '${bio}')`,
      { type: QueryTypes.INSERT }
    );

    return res.status(200).json({ message: "Author Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = addAuthor;
