const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Database is running !");
  } catch (error) {
    console.error("❌ Error when connecting to database :", error);
    process.exit(1);
  }
};

module.exports = connectDB;
