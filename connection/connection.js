const mongoose = require("mongoose");


const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.URL);
    console.log(`connection successfull `);
  } catch (error) {
    console.log(`connection unsuccessfull ${error}`);
  }
};
module.exports = {
  dbConnection,
};
