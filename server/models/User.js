const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // decouple the users and the tasks
  tasks: [
    {
      _id: { type: String, required: true },
      content: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }
  ]
});
  
const User = model('User', userSchema, "users");

module.exports = User;