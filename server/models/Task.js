const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  content: { type: String, required: true, unique: true },
  completed: { type: Boolean, default: false },
});
  
const Task = model('Task', taskSchema, "tasks");

module.exports = Task;