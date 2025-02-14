const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to the database ${process.env.MONGO_URI}!`);
  } catch (error) {
    console.error("❌ Error when connecting to database :", error);
    process.exit(1);
  }
};

module.exports = connectDB;
