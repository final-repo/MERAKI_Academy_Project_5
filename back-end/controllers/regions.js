const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.getAllRegions = async (req, res, next) => {
  const query = `SELECT * FROM regions  `;
  try {
    const response = await pool.query(query);

    res.status(200).json({
      error: false,
      message: "All regions",
      regions: response.rows,
    });
    console.log(response);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addNewRegions = async (req, res, next) => {
  const { region } = req.body;
  const value = [region];
  const query = `INSERT INTO regions (region) VALUES ($1)`;
  try {
    const response = await pool.query(query, value);
    res.status(200).json({
      error: false,
      message: "regions added ",
      regions: response.rows,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
