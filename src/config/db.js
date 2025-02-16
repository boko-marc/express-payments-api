const mongoose = require("mongoose");
const mongoURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`✅ Connected to the database ${process.env.MONGO_URI}!`);
  } catch (error) {
    console.error("❌ Error when connecting to database :", error);
    process.exit(1);
  }
};

module.exports = connectDB;
