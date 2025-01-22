const mongoose = require('mongoose');
const uri = "mongodb+srv://small_project:1234567890@cluster0.4pgnv.mongodb.net/todo_list?retryWrites=true&w=majority";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
}

module.exports = connectDB;