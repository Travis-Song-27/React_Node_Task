const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  task_id: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
  
const Task = model('Task', taskSchema, "tasks");

module.exports = Task;