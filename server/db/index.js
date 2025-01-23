const mongoose = require('mongoose');
const uri = "mongodb+srv://small_project:1234567890@cluster0.4pgnv.mongodb.net/todo_list?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 

  }
}

module.exports = connectDB;