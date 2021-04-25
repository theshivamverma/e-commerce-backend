const mongoose = require("mongoose");
require('dotenv').config()

console.log(typeof(process.env.DB_URI))

async function initializeDBConnection() {
  try {
    const res = await mongoose.connect(process.env.DB_URI.toString(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { initializeDBConnection };
