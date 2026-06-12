const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    console.log(process.env.MONGO_URI);
  }
};

module.exports = connectDB;